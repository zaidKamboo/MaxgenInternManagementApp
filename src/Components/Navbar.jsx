import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const links = [
        { href: '/', to: 'Home' },
        { href: '/about', to: 'About' },
        { href: '/contact', to: 'Contact' }
    ]
    return (
        <ul className=' flex px-5 py-5 bg-gradient-to-r from-sky-300 via-blue-500 to-sky-300 justify-between max-w-screen  text-slate-950 font-bold shadow-md shadow-black'>
            {links.map(link => {
                return <li key={link.to}><Link to={link.href}>{link.to}</Link></li>
            })}
        </ul>
    )
}

export default Navbar