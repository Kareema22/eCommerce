import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ClimbingBoxLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import useCategories from '../../Hooks/categories.hook'


export default function Categories() {
  const { data, isError, error, isLoading, isFetching } = useCategories()

  const navigate = useNavigate()

  if (isError) {
    toast.error(error.message)
  }

  function handleOnCategoryClick(category) {
    navigate('/products?category=' + category)
  }

  if (isLoading) return <div className="fixed top-[50%] left-[50%] right-[50%] bottom-[50%] py-8"><ClimbingBoxLoader color='green' /></div>


  return <>
    <div className='container'>
      <div className="row">
        {data?.map((category) =>
          <div key={category._id} onClick={() => handleOnCategoryClick(category.name)} className='w-1/3 p-2 cursor-pointer'>
            <div className='border rounded-xl hover:shadow-2xl' >
              <img className='category-img w-full object-cover' src={category.image} alt={category.name}></img>
              <h2 className='font-light mt-2 text-3xl text-center text-green-500  m-4'>{category.name}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
}
