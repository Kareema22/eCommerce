import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function VerifyCode() {
  let navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);


  function handelVerifySubmit(formValues) {
    setIsLoading(true);

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, formValues)
      .then(function (response) {
        setIsLoading(false);
        if (response.data.status == 'Success') {
          navigate('/reset-password');
        }
      }).catch(function (apiResponse) {
        toast.error(apiResponse?.response?.data?.message)
        setIsLoading(false);
      })

  }


  let formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: handelVerifySubmit
  })

  return <>
    <div className='py-6 w-3/4 '>
      <h2 className='text-3xl font-bold mb-6 text-[#4fa74f]'> please enter your verification code</h2>

      <form onSubmit={formik.handleSubmit} className=" ">
        <div className="mb-5">
          <label htmlFor="code" className="block mb-2 text-m font-light text-gray-900 dark:text-white">code</label>
          <input type="text" name='resetCode' id="email" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
        </div>

        <button type='submit' className='border-b-gray-500 border  bg-[#4fa74f] rounded p-2'> {isLoading ? <i className='fas fa-spinner fa-spin'> </i> : 'Verify'}</button>

      </form>
    </div >

  </>
}
