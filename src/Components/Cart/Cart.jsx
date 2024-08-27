import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClimbingBoxLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { CartContext } from '../../Context/CartContext'

export default function Cart() {
  const { getUserCart, updateCartItemQuantity, deleteProductFromUserCart, clearUserCart } = useContext(CartContext)
  const [cartDetails, setCartDetails] = useState(null)
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate()

  async function getCart() {
    try {
      const response = await getUserCart()
      if (response) setCartDetails(response)
    }
    catch (error) {
      if (error.response.status === 401) navigate('/login')
    }
  }

  async function handleUpdateProductCount(productId, count) {
    try {
      const response = await updateCartItemQuantity(productId, count)
      toast.info("Quantity updated successfully")
      setCartDetails(response.data)
    }
    catch (error) {
      console.log(error)
      if (error.response.status === 401) navigate('/login')
    }
  }

  async function handleDeleteProduct(productId) {
    try {
      const response = await deleteProductFromUserCart(productId)
      toast.info("Product deleted successfully")
      setCartDetails(response.data)
    }
    catch (error) {
      console.log(error)
      if (error.response.status === 401) navigate('/login')
    }
  }

  async function handleClearCart() {
    setLoading(true)
    try {
      const response = await clearUserCart()
      toast.info("Cart cleared successfully")
      setLoading(false)
      setCartDetails({ products: [] })
    }
    catch (error) {
      console.log(error)
      if (error.response.status === 401) navigate('/login')
    }
  }


  useEffect(() => {
    getCart()
  }, [])


  return <>
    {
      cartDetails ?
        <div className="relative overflow-x-auto sm:rounded-lg">
          <h2 className='text-center text-3xl text-green-500 py-5'>Shopping Cart</h2>
          <h3 className='text-center text-lg text-slate-600 font-light'>Total Cart Price: {cartDetails.totalCartPrice} EGP</h3>
          <div className='row justify-center'>
            <Link to={'/checkout/' + cartDetails._id}>
              <button className="px-4 py-2 rounded-lg text-white bg-green-500 " disabled={cartDetails.totalCartPrice ? false : true}>{loading ? <i className='fas fa-spinner fa-spin'></i> :
                "Checkout Now"}
              </button></Link>
          </div>
          <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                cartDetails.products.map(product => <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={() => handleUpdateProductCount(product.product.id, Number(product.count) - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <div>
                        <span className="text-center bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg px-2.5 py-1">{product.count}</span>
                      </div>
                      <button onClick={() => handleUpdateProductCount(product.product.id, Number(product.count) + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4">
                    <a onClick={() => handleDeleteProduct(product.product.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                  </td>
                </tr>)
              }
            </tbody>
          </table>
          {cartDetails.products.length ?
            <>
              <div className='text-center'>
                <button onClick={() => handleClearCart()} className="px-4 py-2 rounded-lg text-white bg-green-500 w-1/4">{loading ? <i className='fas fa-spinner fa-spin'></i> :
                  "Clear Cart"}
                </button>
              </div>
              <div className='pt-10 text-center'>

              </div>
            </> : null}
        </div>
        :
        <div className="fixed top-[50%] left-[50%] right-[50%] bottom-[50%] py-8"><ClimbingBoxLoader color='green' /></div>
    }
  </>
}
