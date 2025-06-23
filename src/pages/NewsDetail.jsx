import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../context/Context'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'

const NewsDetail = () => {

  const { light, lan } = useContext(GlobalContext)
  const { id } = useParams()
  const currentUrl = window.location.href

  const [loading, setLoading] = useState(true)
  const [newsItem, setNewsItem] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)

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

            <div className="author flex justify-between items-center">
              <div className="flex flex-col">
                <p className={`text-xs text-gray-500`}>by <span className='font-bold'>{newsItem.author[lan]?.name || 'Unknown'}</span></p>
                <p className="text-xs text-gray-500">{newsItem.date}</p>
              </div>

              <button
                className={`rounded-full border p-2 h-fit w-fit ${light ? 'border-neutral-300 active:bg-neutral-300' : 'border-neutral-600 active:bg-neutral-600'} transition-all duration-500 `}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: newsItem.title[lan],
                      text: newsItem.description[lan],
                      url: currentUrl,
                    }).catch((error) => console.error('Share failed:', error));
                  } else {
                    alert('Web Share API not supported on this browser.');
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height={15} width={15} color={light ? 'black' : 'white'} viewBox="0 0 24 24" fill="currentColor"><path d="M13.1202 17.0228L8.92129 14.7324C8.19135 15.5125 7.15261 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.15255 8 8.19125 8.48746 8.92118 9.26746L13.1202 6.97713C13.0417 6.66441 13 6.33707 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6C21 8.20914 19.2091 10 17 10C15.8474 10 14.8087 9.51251 14.0787 8.73246L9.87977 11.0228C9.9583 11.3355 10 11.6629 10 12C10 12.3371 9.95831 12.6644 9.87981 12.9771L14.0788 15.2675C14.8087 14.4875 15.8474 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 17.6629 13.0417 17.3355 13.1202 17.0228ZM6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14ZM17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8ZM17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z"></path></svg>
              </button>
            </div>


            <div className="h-fit w-auto overflow-hidden flex flex-col gap-1">
              <div className='img  w-full aspect-video bg-neutral-200 rounded-sm overflow-hidden'>
                <img
                  src={newsItem.thumbnail}
                  alt={newsItem.title[lan]}
                  className='h-full w-full object-cover object-center'
                  loading='lazy'
                />
              </div>

              {newsItem.aboutImg && (
                <p className={`${light ? 'text-gray-900' : 'text-white'} text-[10px] leading-4 italic font-light`}>{newsItem.aboutImg[lan]}</p>
              )}
            </div>

            <div className="content mt-2">
              {newsItem.content[lan].map((e, i) => {
                return (
                  <p className={`${lan === 'en' ? 'serif-playfair' : 'kannada-font'} font-medium text-[18px] lg:text-xl mb-6 ${light ? 'text-black' : 'text-white'}`} key={i}>{e}</p>
                )
              })}
            </div>

            <div className="about-user flex justify-center items-center gap-2 pl-4 border-l-4 border-l-neutral-500 mt-4">
              <img src={newsItem.author[lan]?.img || '/images/defaultUserIcon.jpg'} alt={`${newsItem.author[lan].name}'s Img`} className='h-20 w-20 rounded-full' />

              <p className={`${light ? 'text-gray-700' : 'text-gray-300'} text-sm font-light italic`}>{newsItem.author[lan].about}</p>
            </div>


          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default NewsDetail