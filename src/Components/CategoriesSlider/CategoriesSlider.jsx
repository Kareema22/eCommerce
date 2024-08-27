import React from 'react'
import Slider from 'react-slick'
import { toast } from 'react-toastify'
import useCategories from '../../Hooks/categories.hook'


export default function CategoriesSlider() {

  const { data, isError, error, isLoading, isFetching } = useCategories()

  if (isError) {
    toast.error(error.message)
  }


  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1500

  };

  return <>
    <div className="py-5">
      <h2 className="py-4 text-gray-800 font-light">Shop Popular Categories</h2>
      <Slider {...settings}>
        {data?.map((category) => <div key={category._id}>
          <img className='category-img w-full' src={category.image} alt={category.name}></img>
          <h2 className='font-light mt-2 text-xl text-gray-800 '>{category.name}</h2>
        </div>)}
      </Slider>
    </div>
  </>
}