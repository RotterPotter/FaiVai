import React from 'react'
import { Link } from 'react-router-dom'

export default function LogIn() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <form action="POST" className='flex flex-col items-center w-full sm:max-w-[500px] space-y-3 bg-gray-100 px-20 py-9 rounded-3xl -mt-24'>
        <span className='text-2xl font-medium mb-4'>Login</span>
        <input type="email" placeholder="Email" className='input-reset w-full h-[50px] rounded-full p-4 ' />
        <input type="password" placeholder="Password" className='input-reset w-full h-[50px] rounded-full p-4 ' />
        <button type="submit" className='w-full h-[50px] rounded-full p-4 bg-green-500 text-white text-center active:bg-green-500 shadow-lg active:shadow-none'>Login</button>
        <span className='pt-2'>Haven't got any account? <Link to={'/signup'} className='text-green-500 '>Sign up</Link></span>
      </form>
    </div>
  )
}
