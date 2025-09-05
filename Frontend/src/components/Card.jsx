import React from 'react'
// import image from "../assets/heroSection-bg.png";

const Card = ({title, description, image, auther, date}) => {

  return (
    <div className='p-5 m-10 transition-transform duration-500 max-w-[25%] ease-in-out transform bg-white border border-gray-400 rounded-xl hover:shadow-xl hover:-translate-y-1 hover:scale-105'>
      <div >
        <img className='shadow-xl rounded-xl w-110 h-65' src={image} alt="image" /><br />
        <h2 className='py-2 text-3xl max-w-[90%] font-bold text-gray-800 transition-colors duration-200 line-clamp-1 hover:text-blue-600 '>{title}</h2>
        <p className='mb-3 max-w-[98%] text-lg leading-relaxed text-gray-800 line-clamp-2'>{description}</p>
      </div>
      <div><b>{auther}</b><span className='pl-3 text-sm'>{date}</span></div>
      <div className='flex justify-between mt-4'>
        <div>
        </div>
        <button
          className="inline-block px-4 text-sm font-semibold text-blue-600 transition duration-200 cursor-pointer hover:text-blue-800"
        >
          Read More →
        </button>
      </div>
    </div>
  )
}

export default Card;
