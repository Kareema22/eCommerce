import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { toast } from 'react-toastify'
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishListContext'
import { BASE_URL } from '../../utilities/constant'
import RecentProducts from '../RecentProducts/RecentProducts'


export default function ProductDetails() {
  const { id, category } = useParams();

  const [productDetails, setProductDetails] = useState(null)
  const [withListIds, setWithListIds] = useState([])
  const [loading, setLoading] = useState(false)

  const { addProductToUserWishList, getUserWishListIds } = useContext(WishListContext)

  async function handleSetWishList() {
    const ids = await getUserWishListIds()
    setWithListIds(ids)
  }

  useEffect(() => {
    handleSetWishList()
    getProduct(id)
  }, [id, withListIds])



  const { addProductToUserCart } = useContext(CartContext)

  const navigate = useNavigate()

  async function handleAddToCart(productId) {
    setLoading(true)
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
    try {
      const response = await addProductToUserWishList(productId)
      toast.info(response.message)
      const withList = await getUserWishListIds()
      setWithListIds(withList)
    }
    catch (error) {
      if (error.response.status === 401) navigate('/login')
    }
  }

  function getProduct(id) {
    axios.get(BASE_URL + `/api/v1/products/${id}`).then(response => {
      setProductDetails(response.data?.data)
    }).catch(error => {
      toast.error(error.message)
    })
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500
  };

  return <>
    <div className="row">
      {
        productDetails &&
        <>
          <div className="w-1/4">
            <Slider {...settings}>
              {productDetails?.images.map((src) => <img key={productDetails.id} className='w-full' src={src} alt={productDetails?.title} />
              )}
            </Slider>
          </div>
          <div className="w-3/4 p-6">
            <h1 className="text-lg font-normal text-gray-950">{productDetails?.title}</h1>
            <p className="text-gray-600 mt-4 font-light">{productDetails?.description}</p>

            <div className="flex my-4 justify-between items-center">
              <span>{productDetails?.price} EGP</span>
              <span>{productDetails?.ratingsAverage} <i className="fa fa-star text-yellow-300"></i></span>
            </div>
            <div className='row'>
              <div className='w-[80%]'>
                <button onClick={() => handleAddToCart(productDetails.id)} className="btn">
                  {loading ? <i className='fas fa-spinner fa-spin'></i> :
                    "Add to cart"}
                </button>
              </div>
              <div className='w-[20%] text-right'>
                {
                  withListIds?.includes(productDetails.id) ?
                    <i onClick={() => handleAddToWishList(productDetails.id)} className="text-3xl cursor-pointer fa-solid fa-heart text-red-600"></i>
                    : <i onClick={() => handleAddToWishList(productDetails.id)} className="text-3xl cursor-pointer fa-solid fa-heart"></i>
                }
              </div>
            </div>
          </div>

          <div className='mt-30 text-center'>
            <h1 className=' text-4xl text-green-600'>Related Products</h1>
            <div className="row">
              <RecentProducts category={category} />
            </div>
          </div>
        </>
      }
    </div>
  </>
}
