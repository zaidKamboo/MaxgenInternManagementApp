import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import EditIntern from '../Pages/EditIntern'
import AddIntern from '../Pages/AddIntern'
import DeleteIntern from '../Pages/DeleteIntern'

const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path="/addIntern" element={<AddIntern />} />
            <Route exact path='/edit/:id' element={<EditIntern />} />
            <Route exact path="/deleteIntern/:id" element={<DeleteIntern />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
        </Routes>
    )
}

export default AllRoutes