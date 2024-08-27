import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';


export default function ResetPassword() {


  let { setUserToken } = useContext(UserContext);

  let myValidate = Yup.object().shape({
    email: Yup.string().email("email is invailed").required("email pattern is inavalid"),
    newPassword: Yup.string().matches(/^[a-z]+[0-9]+$/, 'invalid password').required("password is required"),

  })



  let navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);


  function handelResetPassword(formValues) {
    setIsLoading(true);

    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, formValues)
      .then(function (response) {
        setIsLoading(false);
        if (response.data.token) {
          localStorage.setItem("userToken", response.data.token)
          setUserToken(response.data.token)
          navigate('/');
        }
      })
      .catch(function (apiResponse) {
        toast.error(apiResponse?.response?.data?.message)
        setIsLoading(false);
      })


  }


  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: myValidate,
    onSubmit: handelResetPassword
  })

  return <>
    <div className='py-6 w-3/4 '>
      <h2 className='text-3xl font-bold mb-6 text-[#4fa74f]'> Reset   your account Password </h2>
      {/* validate Name */}

      <form onSubmit={formik.handleSubmit} className=" ">


        {/* validate email */}


        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-m font-light text-gray-900 dark:text-white">Email</label>
          <input type="email" name='email' id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
        </div>

        {formik.errors.email && formik.touched.email ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div>
          : null}
        {/* validate password */}

        <div className="mb-5">
          <label htmlFor="newPassword" className="block mb-2 text-m font-light text-gray-900 dark:text-white">Password</label>
          <input type="password" name='newPassword' id="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
        </div>
        {formik.errors.newPassword && formik.touched.newPassword ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.newPassword}
          </div>
          : null}
        <button type='submit' className='border-b-gray-500 border  bg-[#4fa74f] rounded p-2'> {isLoading ? <i className='fas fa-spinner fa-spin'> </i> : 'Reset Password'}</button>


      </form>
    </div >

  </>
}
