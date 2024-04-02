import React from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import Form from '../Components/Form';
import { useSelector } from 'react-redux';
import Alert from '../Components/Alert';
import Navbar from '../Components/Navbar';
import TeamsPage from './TeamsPage';

const AllRoutes = () => {
    const { message, show, type } = useSelector(state => state.alertr);
    const user = useSelector(store => store.user)
    return (
        <>
            {user?.email && <Navbar />}
            {show && <Alert type={type} message={message} />}
            <Routes>
                <Route exact path='/' Component={HomePage} />
                <Route exact path='/teams' Component={TeamsPage} />
                <Route exact path='/signup' element={<Form type="Sign Up" />} />
                <Route exact path='/login' element={<Form type="Login" />} />
                <Route exact path='/edit/:id' element={<Form type="Edit" />} />
            </Routes>
        </>
    )
}

export default AllRoutes