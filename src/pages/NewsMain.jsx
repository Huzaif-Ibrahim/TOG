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

  useEffect(() => {
    fetch('/News.json')
    .then(res => res.json())
    .then(data => setNews(data))
  },[])

  return (
    <>
        <Navbar />
        <section className={`px-4 lg:px-0 pt-20 md:pt-24 pb-16 min-h-screen ${light ? 'bg-white' : 'bg-[#121212]'}`}>
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
                  author={elem.author[lan]} 
                  category={elem.category} 
                  department={elem.department}  />
                )
              })}
            </div>
          </div>
        </section>

        <Footer />
    </>
  )
}

export default NewsMain