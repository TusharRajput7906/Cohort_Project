import React from 'react'

const NewTask = ({data, index, onAccept}) => {
  // Handle case where data might be missing
  const categories = data?.categories || "Category";
  const date = data?.date || "No date";
  const title = data?.title || "Task Title";
  const description = data?.description || "No description";

  return (
     <div className='w-[27%] h-80 bg-red-300 shrink-0 rounded-2xl px-4 py-6 flex flex-col gap-6'>
            <div className=' flex justify-between'>
                <div className='px-4 py-1 rounded-xl bg-red-500'>{categories}</div>
                <p className='text-xl font-medium'>{date}</p>
            </div>
            <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-xl font-normal'>{description}</p>
            </div>
            <div className='flex justify-center'>
                <button 
                    className='text-lg px-4 py-2 rounded-xl active:scale-98 bg-blue-500 text-white'
                    onClick={() => onAccept(index)}
                >
                    Accept Task
                </button>
            </div>
        </div>
  )
}

export default NewTask
