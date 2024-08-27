import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishListContext'


export default function Wishlist() {
  const { getUserWishList, deleteProductFromUserWishList } = useContext(WishListContext)
  const { addProductToUserCart } = useContext(CartContext)

  const [wishListDetails, setWishListDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentProductId, setCurrentProductId] = useState()


  const navigate = useNavigate()

  async function getWishList() {
    try {
      const response = await getUserWishList()
      if (response) setWishListDetails(response)
    }
    catch (error) {
      if (error.response.status === 401) navigate('/login')
    }
  }

  async function handleDeleteProduct(productId) {
    try {
      const response = await deleteProductFromUserWishList(productId)
      toast.info("Product deleted successfully")
      await getWishList()
    }
    catch (error) {
      console.log(error)
      if (error.response.status === 401) navigate('/login')
    }
  }


  async function handleAddToCart(productId) {
    setCurrentProductId(productId)
    setLoading(true)
    try {
      const response = await addProductToUserCart(productId)
      await deleteProductFromUserWishList(productId)
      await getWishList()
      toast.info(response.message)
      setLoading(false)

    }
    catch (error) {
      console.log(error)
      if (error.response.status === 401) navigate('/login')
    }
  }



  useEffect(() => {
    getWishList()
  }, [])

  return <>
    {
      wishListDetails ?
        <div className="relative overflow-x-auto sm:rounded-lg">
          <h2 className='text-center text-3xl text-green-500 py-5'>Wishlist</h2>
          <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              {
                wishListDetails.map(product => <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <div>{product.title}</div>
                    <div>${product.price}</div>

                    <div>
                      <span onClick={() => handleDeleteProduct(product.id)} className='text-red-600 cursor-pointer'><i className="fa-solid fa-trash"></i> Remove</span>
                    </div>

                  </td>
                  <td className="px-6 py-4">
                  </td>
                  <td className="px-6 py-4">
                    <button className="btn" onClick={() => handleAddToCart(product.id)}>
                      {loading && currentProductId === product.id ? <i className='fas fa-spinner fa-spin'></i> :
                        "Add to cart"}</button>
                  </td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
        :
        <div className="fixed top-[50%] left-[50%] right-[50%] bottom-[50%] py-8"><ClimbingBoxLoader color='green' /></div>
    }
  </>
}
