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

//   const authorData = {
//     "huzaif": {
//         "en": {
//             "name": "Huzaif Ibrahim",
//             "about": "Huzaif Ibrahim is a curious learner and passionate creator who enjoys exploring ideas across technology, economics, and world affairs. He is a 3rd sem CSE student.This site is a part of his personal learning journey — an effort to simplify knowledge, connect ideas, and grow through curiosity. He hopes it adds value to your journey too.",
//             "img": "/images/defaultUserIcon.jpg"
//         },
//         "kn": {
//             "name": "ಹುಜಾಫ್ ಇಬ್ರಾಹಿಂ",
//             "about": "ಹುಜಾಫ್ ಇಬ್ರಾಹಿಂ ತಾಂತ್ರಿಕತೆ, ಅರ್ಥಶಾಸ್ತ್ರ ಮತ್ತು ಜಾಗತಿಕ ವಿಷಯಗಳಲ್ಲಿ ಕಲ್ಪನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ಇಚ್ಛಿಸುವ ಕುತೂಹಲದಿಂದ ಕೂಡಿದ ಓದುಗ ಮತ್ತು ಉತ್ಸಾಹಿ ಸೃಜನಶೀಲ ವ್ಯಕ್ತಿ. ಅವರು ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಅಂಡ್ ಎಂಜಿನಿಯರಿಂಗ್ (CSE) ವಿಭಾಗದ 3ನೇ ಸೆಮಿಸ್ಟರ್ ವಿದ್ಯಾರ್ಥಿ.ಈ ತಾಣವು ಅವರ ವೈಯಕ್ತಿಕ ಕಲಿಕಾ ಪ್ರಯಾಣದ ಒಂದು ಭಾಗ — ಜ್ಞಾನವನ್ನು ಸರಳಗೊಳಿಸಲು, ಕಲ್ಪನೆಗಳನ್ನು ಸಂಪರ್ಕಿಸಲು ಮತ್ತು ಕೌತುಹಲದ ಮೂಲಕ ಬೆಳೆಯುವ ಒಂದು ಪ್ರಯತ್ನ. ಇದು ನಿಮ್ಮ ಪ್ರಯಾಣಕ್ಕೂ ಮೌಲ್ಯವಂತಾಗುತ್ತದೆ ಎಂಬ ಆಶಯವಿದೆ.",
//             "img": "/images/defaultUserIcon.jpg"
//         }
//     }
// }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch only news data
        const newsRes = await fetch('/News.json')
        const authorRes = await fetch('/Author.json')

        if (!newsRes.ok) {
          throw new Error('Failed to fetch news data')
        }
        
        const newsData = await newsRes.json()
        const authorData = await authorRes.json()
        
        // Enrich news with author data
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
        {loading ?
        <section className={`px-4 pt-20 h-screen ${light ? 'bg-white' : 'bg-[#121212]'}`}>
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          </div>
        </section>
      : <section className={`px-4 lg:px-0 pt-20 md:pt-24 pb-16 min-h-screen ${light ? 'bg-white' : 'bg-[#121212]'}`}>
          <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
              {news.map((elem) => {
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
                  category={elem.category} 
                  department={elem.department}  />
                )
              })}
            </div>
          </div>
        </section>}

        <Footer />
    </>
  )
}

export default NewsMain