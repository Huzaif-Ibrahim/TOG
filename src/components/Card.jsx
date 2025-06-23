import React, { useContext } from 'react'
import { GlobalContext } from '../context/Context'

const Card = ({ id , thumbnail, title, description, date, author, category , navigate}) => {

    const { light, lan } = useContext(GlobalContext)

    return (
        <div className={`rounded-lg h-full border shadow-md hover:shadow-lg transition-shadow duration-300 ${light ? 'bg-white text-black border-gray-200' : 'bg-[#1E1E1E] text-white border-[#2A2A2A]'}`}
        onClick={()=>navigate(`/news/${id}`)}
        >
            <div className="container flex flex-col gap-4 p-4 h-full w-full">
                <div className="img h-fit w-auto rounded-sm overflow-hidden">
                    <img src={thumbnail} alt={title} className='h-full w-full'/>
                </div>

                <div className="info flex flex-col gap-2">

                    <div className="flex flex-col gap-1">
                        <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full w-fit">
                            {category}
                        </span>
                        <p className="text-xs text-gray-500">{date}</p>
                    </div>

                    <div className="flex flex-col">
                        <p className={`${lan === 'en' ? 'serif-playfair' : 'kannada-font'} text-lg md:text-xl font-semibold ${light ? 'text-gray-900' : 'text-white'} `}>{title}</p>
                        <p className={`${lan === 'en' ? 'serif-playfair' : 'kannada-font'} font-medium text-sm md:text-base ${light ? 'text-gray-700' : 'text-gray-300'}`} >{description}</p>
                    </div>

                    <p className='flex items-center gap-1'>
                        <span className={`text-xs text-gray-500 ${lan === 'en' ? 'serif-playfair' : 'kannada-font'}`}>
                            {author.name}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color='gray' height={15} width={15}><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card

// Meta Info (author, date)	text-xs text-gray-500