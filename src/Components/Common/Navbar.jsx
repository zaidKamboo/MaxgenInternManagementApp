import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const links = [
        { href: '/', title: 'Home' },
        { href: '/about', title: 'About' },
        { href: '/contact', title: 'Contact' },
        { href: "/addIntern", title: "Add Intern" },
    ]
    return (
        <ul className=' flex px-5 py-5 bg-gradient-to-r from-sky-300 via-blue-500 to-sky-300 justify-between max-w-screen  text-slate-950 font-bold shadow-md shadow-black'>
            {links.map(link => {
                return <li key={link.to}><Link to={link.href}>{link.title}</Link></li>
            })}
        </ul>
    )
}

export default Navbar