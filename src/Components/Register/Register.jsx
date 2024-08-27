import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';




import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Register() {

  const { setUserToken } = useContext(UserContext);

  let myValidate = Yup.object().shape({
    name: Yup.string().min(3, "name min length is 3").max(10).required("name is required"),
    email: Yup.string().email("email is invailed").required("email pattern is inavalid"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'invalid phone number').required("invalid Phone"),
    password: Yup.string().matches(/^[a-z]+[0-9]+$/, 'invalid password').required("password is required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'password not matches').required("password not matches"),

  })



  let navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);


  function handelRegister(formValues) {
    setIsLoading(true);

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then(function (response) {
        setIsLoading(false);
        if (response.data.message == 'success') {
          localStorage.setItem("userToken", response.data.token)
          setUserToken(response.data.token)
          navigate('/');
        }
      }).catch(function (apiResponse) {
        toast.error(apiResponse?.response?.data?.message)
        setIsLoading(false);
      })



  }
  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''

    },
    validationSchema: myValidate,
    onSubmit: handelRegister
  })

  return <>
    <div className='py-6 w-3/4 '>
      <h2 className='text-3xl font-bold mb-6 text-[#4fa74f]'> Register now </h2>
      {/* validate Name */}

      <form onSubmit={formik.handleSubmit} className=" ">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-m font-light text-gray-900 dark:text-white">Name</label>
          <input type="text" id="name" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
        </div>
        {formik.errors.name && formik.touched.name ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.name}
          </div>
          : null}

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
          <label htmlFor="password" className="block mb-2 text-m font-light text-gray-900 dark:text-white">Password</label>
          <input type="password" name='password' id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
        </div>
        {formik.errors.password && formik.touched.password ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div>
          : null}
        {/* validate repassword */}

        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-m font-light text-gray-900 dark:text-white">Repassword</label>
          <input type="password" name='rePassword' id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
        </div>

        {formik.errors.rePassword && formik.touched.rePassword ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.rePassword}
          </div>
          : null}

        {/* validate phone */}

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-m font-light text-gray-900 dark:text-white">phone</label>
          <input type="tel" name='phone' id="phone" onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />

          {formik.errors.phone && formik.touched.phone ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.phone}
            </div>
            : null}

        </div>
        <button type='submit' className='border-b-gray-500 border  bg-[#4fa74f] rounded p-2'> {isLoading ? <i className='fas fa-spinner fa-spin'> </i> : 'Submit'}</button>

      </form>
    </div >

  </>
}
