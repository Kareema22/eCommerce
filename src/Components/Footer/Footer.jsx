import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Footer.module.css'


export default function Footer() {
  const [first, setfirst] = useState()
  useEffect(()=>{},[])
  
  return <>
  <h1>Footer</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ipsum animi mollitia ut, provident quidem voluptatum perspiciatis ea pariatur enim.</p>

  </>
}
