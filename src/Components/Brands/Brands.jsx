import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ClimbingBoxLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import useBrands from '../../Hooks/brands.hook'


export default function Brands() {
  const { data, isError, error, isLoading, isFetching } = useBrands()

  const navigate = useNavigate()

  if (isError) {
    toast.error(error.message)
  }

  function handleOnBrandClick(brand) {
    navigate('/products?brand=' + brand)
  }

  if (isLoading) return <div className="fixed top-[50%] left-[50%] right-[50%] bottom-[50%] py-8"><ClimbingBoxLoader color='green' /></div>


  return <>
    <div className='container'>
      <div className="row">
        {data?.map((brand) =>
          <div onClick={() => handleOnBrandClick(brand.name)} key={brand._id} className='w-1/4 p-2 cursor-pointer'>
            <div className='border rounded-xl hover:shadow-2xl' >
              <img className='brand-img w-full' src={brand.image} alt={brand.name}></img>
              <h2 className='font-light mt-2 text-3xl text-center text-green-500  m-4'>{brand.name}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
}
