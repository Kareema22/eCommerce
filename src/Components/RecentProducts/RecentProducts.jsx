import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ClimbingBoxLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishListContext'
import { BASE_URL } from '../../utilities/constant'

export default function RecentProducts({ category }) {
  const search = useLocation().search;
  category = category ?? new URLSearchParams(search).get("category");
  const brand = new URLSearchParams(search).get("brand");

  const { addProductToUserCart } = useContext(CartContext)
  const { addProductToUserWishList, getUserWishListIds } = useContext(WishListContext)


  const [loading, setLoading] = useState(false)
  const [currentProductId, setCurrentProductId] = useState()
  const [withListIds, setWithListIds] = useState([])


  const navigate = useNavigate()

  async function handleAddToCart(productId) {
    setLoading(true)
    setCurrentProductId(productId)
    try {
      const response = await addProductToUserCart(productId)
      setLoading(false)
      toast.info(response.message)
    }
    catch (error) {
      if (error.response.status === 401) navigate('/login')
    }
  }

  async function handleAddToWishList(productId) {
    setCurrentProductId(productId)
    try {
      const response = await addProductToUserWishList(productId)
      toast.info(response.message)
      const withListIds = await getUserWishListIds()
      setWithListIds(withListIds)
    }
    catch (error) {
      console.log(error)
      if (error.response.status === 401) navigate('/login')
    }
  }

  async function handleSetWishList() {
    const ids = await getUserWishListIds()
    setWithListIds(ids)
  }

  useEffect(() => { handleSetWishList() }, [withListIds])



  function getProducts() {
    return axios.get(BASE_URL + '/api/v1/products')
  }

  const { data, isError, error, isLoading, isFetching } =
    useQuery({
      queryKey: ['products'],
      queryFn: getProducts,
      select: (data) => category ?
        data.data.data.filter(product => product.category.name === category)
        : brand ? data.data.data.filter(product => product.brand.name === brand)
          : data.data.data
    })

  if (isError) {
    toast.error(error.message)
  }

  if (isLoading) return <div className="fixed top-[50%] left-[50%] right-[50%] bottom-[50%] py-8"><ClimbingBoxLoader color='green' /></div>

  return <>
    <div className="row">
      {
        data.map(product => <div key={product.id} className='w-1/6 px-4'>
          <div className="product py-4">
            <Link to={`/product-details/${product.id}/${product.category.name}`}>
              <img className='w-full' src={product.imageCover} alt={product.title} />
              <span className="block font-light mt-2 text-green-600">{product.category.name}</span>
              <h3 className="text-lg font-normal text-gray-800 mb-4">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
              <div className="flex justify-between items-center">
                <span>{product.price} EGP</span>
                <span>{product.ratingsAverage} <i className="fa fa-star text-yellow-300"></i></span>
              </div>
            </Link>
            <div className='row'>
              <div className='w-[80%]'>
                <button onClick={() => handleAddToCart(product.id)} className="btn">
                  {loading && currentProductId === product.id ? <i className='fas fa-spinner fa-spin'></i> :
                    "Add to cart"}
                </button>
              </div>
              <div className='w-[20%] text-center'>
                {
                  withListIds?.includes(product.id) ?
                    <i onClick={() => handleAddToWishList(product.id)} className="text-3xl cursor-pointer fa-solid fa-heart text-red-600"></i>
                    : <i onClick={() => handleAddToWishList(product.id)} className="text-3xl cursor-pointer fa-solid fa-heart"></i>
                }
              </div>
            </div>
          </div>

        </div>)
      }

    </div>
  </>
}
