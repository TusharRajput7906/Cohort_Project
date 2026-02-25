import React from 'react'
import Mainroute from './routes/Mainroute'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='py-6 px-[10%] min-h-screen w-full font-thin flex flex-col gap-y-2 text-white bg-gray-700'>
      <Navbar/>
      <Mainroute />
    </div>
  )
}

export default App
