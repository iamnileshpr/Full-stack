import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-6xl mx-auto py-2 tracking-tighter flex items-center justify-between'>
       <h1 className='font-semibold'>Code ki pathshala</h1>
       <div className='flex gap-6'>
        <Link to={'/'} className='font-medium'>Home</Link>
        <Link to={'/create'} className='font-medium'>Add a note</Link>
       </div>
    </div>
  )
}

export default Navbar
