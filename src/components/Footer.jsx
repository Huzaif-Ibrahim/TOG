import React, { useContext } from 'react'
import { GlobalContext } from '../context/Context'

const Footer = () => {

    const { light } = useContext(GlobalContext)

    return (
        <footer className={`py-6 text-center ${light ? 'bg-gray-100 text-gray-800' : 'bg-[#1A1A1A] text-gray-300'}`}>
            <p className="text-sm">This platform is made by Huzaif Ibrahim.</p>
            <p className="text-xs mt-1">Created to explore ideas and share knowledge.</p>
        </footer>
    )
}

export default Footer