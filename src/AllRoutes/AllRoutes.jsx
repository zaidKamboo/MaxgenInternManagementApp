import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Form from '../Components/home/Form'
import About from '../Pages/About'
import Contact from '../Pages/Contact'

const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/edit/:id' element={<Form type="Edit" />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
        </Routes>
    )
}

export default AllRoutes