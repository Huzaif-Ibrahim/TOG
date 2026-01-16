import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../context/Context'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

const NewsMain = () => {

  const { light , lan } = useContext(GlobalContext)
  const navigate = useNavigate()

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [contentVisible, setContentVisible] = useState(5)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const newsRes = await fetch('/News.json')
        const authorRes = await fetch('/Author.json')

        if (!newsRes.ok) {
          throw new Error('Failed to fetch news data')
        }
        
        const newsData = await newsRes.json()
        const authorData = await authorRes.json()
        
        const enrichedNews = newsData.map(item => ({
          ...item,
          author: authorData[item.authorId] || {
            en: { name: 'Unknown Author', img: '/images/defaultUserIcon.jpg' },
            kn: { name: 'ಅಪರಿಚಿತ ಲೇಖಕ', img: '/images/defaultUserIcon.jpg' }
          }
        }))

        setNews(enrichedNews)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching news:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  },[])

  
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

  if (error) {
    return (
      <>
        <Navbar />
        <section className={`px-4 pt-20 min-h-screen ${light ? 'bg-white' : 'bg-[#121212]'}`}>
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <p className="text-red-500 text-lg mb-4">Error loading news: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="text-blue-500 hover:text-blue-700 underline"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
        <Navbar />
        <section className={`px-4 lg:px-0 pt-20 md:pt-24 pb-32 min-h-screen ${light ? 'bg-white' : 'bg-[#121212]'}`}>
          <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
              {news.slice(0,contentVisible).reverse().map((elem) => {
                return (
                  <Card 
                  navigate={navigate}
                  key={elem.id} 
                  id={elem.id} 
                  thumbnail={elem.thumbnail} 
                  title={elem.title[lan]} 
                  description={elem.description[lan]} 
                  date={elem.date} 
                  author={elem.author[lan] || { name : 'Unknown Author'} }
                  category={elem.category} />
                )
              })}
            </div>
          </div>

          {contentVisible < news.length && (
            <div className='flex justify-center items-center h-fit mt-8'>
              <button
              onClick={() => setContentVisible((prev) => prev + 5)}
              className={`px-4 py-2 rounded-lg transition-all duration-500 border ${light ? 'bg-white text-black border-gray-200 hover:bg-gray-200' : 'bg-[#1E1E1E] text-white border-[#2A2A2A] hover:bg-[#2A2A2A]'}`}
              >Show More</button>
            </div>
          )}
        </section>

        <Footer />
    </>
  )
}

export default NewsMain