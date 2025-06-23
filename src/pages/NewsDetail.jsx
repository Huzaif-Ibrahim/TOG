import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../context/Context'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'

const NewsDetail = () => {

  const { light, lan } = useContext(GlobalContext)
  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [newsItem, setNewsItem] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0 , 0)

    const fetchNewsItem = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch only the news data (you can optimize this further by having an API endpoint for single news item)
        const response = await fetch(`/News/news${id}.json`)
        const authorRes = await fetch('/Author.json')

        if (!response.ok) {
          throw new Error('Failed to fetch news data')
        }
        
        const data = await response.json()
        const authorData = await authorRes.json()
        const item = data.find((e) => e.id === id)
        
        if (!item) {
          throw new Error('News item not found')
        }

        // Add author data to the news item
        const enrichedItem = {
          ...item,
          author: authorData[item.authorId] || {
            en: { name: 'Unknown Author', about: 'No information available', img: '/images/defaultUserIcon.jpg' },
            kn: { name: 'ಅಪರಿಚಿತ ಲೇಖಕ', about: 'ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ', img: '/images/defaultUserIcon.jpg' }
          }
        }
        
        setNewsItem(enrichedItem)
        
        // Add delay for better UX (optional)
        setTimeout(() => {
          setLoading(false)
        }, 800)
        
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchNewsItem()

  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <section className={`px-4 pt-20 h-screen ${light ? 'bg-white' : 'bg-[#121212]'}`}>
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          </div>
        </section>
      </>
    )
  }

  if (error || !newsItem) {
    return (
      <>
        <Navbar />
        <section className={`pt-20 min-h-screen text-center ${light ? 'bg-white' : 'bg-[#121212]'}`}>
          <div className="flex flex-col items-center justify-center h-96">
            <p className={`text-red-500 text-lg mb-4`}>
              {error || 'News not found'}
            </p>
            <Link 
              to="/" 
              className="text-blue-500 hover:text-blue-700 underline"
            >
              ← Back to News
            </Link>
          </div>
        </section>
      </>
    )
  }


  return (
    <>
      <Navbar />
      <section className={`px-4 lg:px-0 pt-20 md:pt-24 pb-16 min-h-screen ${light ? 'bg-white' : 'bg-[#121212]'}`}>

        {/* <div className={`h-fit w-fit rounded-full p-2 ${light ? 'bg-neutral-200' : 'bg-neutral-800'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color={`${light ? 'black' : 'white'}`} height={25} width={25}><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
        </div> */}

        <div className="container max-w-5xl mx-auto">
          <div className='flex flex-col gap-4'>


            <div className='titleNdesc flex flex-col'>
              <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full w-fit mb-2 lg:mb-6">
                {newsItem.category}
              </span>
              <p className={`${lan === 'en' ? 'serif-playfair' : 'kannada-font'} text-2xl md:text-3xl lg:text-5xl font-semibold ${light ? 'text-gray-900' : 'text-white'} `}>{newsItem.title[lan]}</p>
              <p className={`${lan === 'en' ? 'serif-playfair' : 'kannada-font'} font-medium text-base lg:text-xl ${light ? 'text-gray-700' : 'text-gray-300'}`} >{newsItem.description[lan]}</p>
            </div>

            <div className="author flex flex-col">
              <p className={`text-xs text-gray-500`}>by <span className='font-bold'>{newsItem.author[lan]?.name || 'Unknown'}</span></p>
              <p className="text-xs text-gray-500">{newsItem.date}</p>
            </div>


            <div className="img h-fit w-auto overflow-hidden flex flex-col gap-1">
              <img src={newsItem.thumbnail} alt={newsItem.title[lan]} className='h-full w-full' />

              {newsItem.aboutImg && (
                <p className={`${light ? 'text-gray-900' : 'text-white'} text-[10px] leading-4 italic font-light`}>{newsItem.aboutImg[lan]}</p>
              )}
            </div>

            <div className="content mt-2">
              {newsItem.content[lan].map((e,i) => {
                return (
                  <p className={`${lan === 'en' ? 'serif-playfair' : 'kannada-font'} font-medium text-[18px] lg:text-xl mb-6 ${light ? 'text-black' : 'text-white'}`} key={i}>{e}</p>
                )
              })}
            </div>

            <div className="about-user flex justify-center items-center gap-2 pl-4 border-l-4 border-l-neutral-500 mt-4">
              <img src={newsItem.author[lan]?.img || '/images/defaultUserIcon.jpg' } alt={`${newsItem.author[lan].name}'s Img`} className='h-20 w-20 rounded-full' />

              <p className={`${light ? 'text-gray-700' : 'text-gray-300'} text-sm font-light italic`}>{newsItem.author[lan].about}</p>
            </div>


          </div>
        </div>
      </section>

      <Footer/>
    </>
  )
}

export default NewsDetail