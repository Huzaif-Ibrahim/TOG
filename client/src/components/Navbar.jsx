import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/Context'

const Navbar = () => {

  const { light, setLight, lan, setLan } = useContext(GlobalContext)

  return (
    <nav className={`backdrop-blur-lg bg-transparent fixed top-0 left-0 right-0 border-b ${light ? 'border-b-neutral-200' : 'border-b-neutral-800'}`}>
      <div className="container max-w-7xl mx-auto py-4 px-4 lg:px-0">
        <div className="flex justify-between items-center">
          <Link to={'/'} className={`serif-playfair text-xl md:text-2xl font-semibold ${light ? 'text-black' : 'text-white'}`} >TIMES OF GPT</Link>

          <div className='flex justify-center items-center gap-6'>


            {light ? <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 24 24" fill='black' onClick={() => setLight(false)} className='transition-all duration-200'><path d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z"></path></svg> :
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" height={25} width={25} onClick={() => setLight(true)} className='transition-all duration-200' ><path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path></svg>
            }

            <select name="language" id="language" value={lan} onChange={(e) => setLan(e.target.value)} className={`${light ? 'text-black' : 'text-white'}`}>
              <option value="en" className='text-black'>English</option>
              <option value="kn" className='text-black'>Kannada</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar