import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { UserContext } from '../../Context/UserContext';


export default function Navbar() {

  const navigate = useNavigate()

  const { userToken, setUserToken } = useContext(UserContext)

  const { cartCount } = useContext(CartContext)

  function handleLogout() {
    localStorage.removeItem("userToken")
    setUserToken(null)
    navigate('/login')
  }

  return <>
    <nav className='bg-[#f8f9fa] lg:fixed static top-0 left-0 right-0  z-20   '>
      <div className=' container flex justify-between mx-auto  flex-col lg:flex-row items-center '>

        <div className='logo'>
          <i className='fa-solid fa-cart-shopping  text-4xl text-[#4fa74f] '></i>
          <span className='text-3xl font-medium text-black'>fresh cart</span>
        </div>

        {userToken &&
          <ul className='flex flex-col lg:flex-row'>
            <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 font-light' to='/'>Home</NavLink></li>
            <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 font-light' to='/cart'>Cart</NavLink></li>
            <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 font-light' to='/wishList'>Wish list</NavLink></li>
            <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 font-light' to='/products'>Products</NavLink></li>
            <li className='py-2'> <NavLink className='mx-2 text-lg text-slate-900 font-light' to='/categories'>Categories</NavLink></li>
            <li className='py-2'> <NavLink className='mx-2 text-lg text-slate-900 font-light' to='/brands'>Brands</NavLink></li>
          </ul>}

        <div>
          {userToken && <ul className='flex flex-col lg:flex-row'>
            <li className='py-2 px-3 relative'>
              <i className='fa-solid fa-cart-shopping  text-4xl cursor-pointer'>
                <span className='bg-green-500 text-white p-1 text-sm absolute top-0 right-2 rounded'>{cartCount}</span>
              </i>
            </li>
            <li className='py-2'> <span className='mx-2  text-lg text-slate-900 font-light cursor-pointer' onClick={handleLogout}>Logout</span></li>
          </ul>}
          {!userToken && <ul className='flex flex-col lg:flex-row'>
            <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 font-light' to='/login'>Login</NavLink></li>
            <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 font-light' to='/register'>Register</NavLink></li>
          </ul>}
        </div>

      </div>
    </nav >

  </>


}
