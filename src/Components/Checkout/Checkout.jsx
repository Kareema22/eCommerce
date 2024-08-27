import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';


export default function Checkout() {
  const { checkout } = useContext(CartContext)


  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: () => handleCheckout(id, "http://localhost:5173")
  })



  async function handleCheckout(id, url) {
    const { status, session } = await checkout(id, url, formik.values)
    if (status === "success") {
      window.location.href = session.url
    }
  }


  return <>
    <div className='py-6 w-3/4 '>

      <h2 className='text-3xl font-bold mb-6 text-[#4fa74f]'> Checkout now </h2>
      {/* validate Name */}

      <form onSubmit={formik.handleSubmit} className=" ">

        <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-m font-light text-gray-900 dark:text-white">Details</label>
          <input type="text" name='details' id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-m font-light text-gray-900 dark:text-white">Phone</label>
          <input type="tel" name='phone' id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
        </div>

        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-m font-light text-gray-900 dark:text-white">City</label>
          <input type="text" name='city' id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
        </div>

        <div className='flex justify-between'>
          <button type='submit' className='border-b-gray-500 border  bg-[#4fa74f] rounded p-2'> {isLoading ? <i className='fas fa-spinner fa-spin'> </i> : 'Pay Now'}</button>
        </div>


      </form>
    </div >

  </>
}
