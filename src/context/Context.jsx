import { createContext, useState } from "react"

export const GlobalContext = createContext()

const ContextState = ({ children }) => {

  const [light, setLight] = useState(true)
  const [lan, setLan] = useState('en')

  const setLocalStorage = () => {
    localStorage.setItem('light',JSON.stringify(light))
    localStorage.setItem('lan',JSON.stringify(lan))
  }

  const getLocalStorage = () => {
   return {
    lightStore: JSON.parse(localStorage.getItem('light') ?? 'true'),
    lanStore: JSON.parse(localStorage.getItem('lan') ?? 'en'),
  };
  }

  const exports = {
    light,
    setLight,
    lan,
    setLan,
    getLocalStorage,
    setLocalStorage
  }

  return (
    <GlobalContext.Provider value={exports}>
        { children }
    </GlobalContext.Provider>
  )
}

export default ContextState