import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';
import { setAlert } from '../Store/Slices/alertSlice';
import { userActions } from '../Store/Slices/userSlice';
import { host } from '../CONSTANTS';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user)
    const { message, show, type } = useSelector(state => state.alertr);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        try {
            if (user) {
                dispatch(userActions.resetUser());
                dispatch(setAlert({ show: true, message: "Logged out successfully...", type: "success" }))
                navigate("/signup")
            }
        } catch (error) {
            dispatch(setAlert({ show: true, message: error.message, type: "danger" }))
        }
    }
    const handleDelete = () => {
        try {
            let ans = confirm("Do you want to delete your account?")
            try {
                if (ans) {
                    fetch(host + '/api/users/' + user?._id, {
                        method: "DELETE",
                        headers: { "Content-Type": 'application/json' },
                    })
                        .then(res => res.json())
                        .then(res => {
                            dispatch(userActions.resetUser())

                        })
                        .catch(err => setAlert({ message: err.message, show: true, type: "danger" }))
                }
            } catch (error) {
                dispatch(setAlert({ type: 'danger', message: true, show: true }))
            }
        } catch (error) {

        }
    }

    return (
        <nav className="bg-gray-100 ">
            {show && <Alert type={type} message={message} />}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-gray-900 font-bold text-lg">
                                Logo
                            </Link>
                        </div>
                        <div className="hidden w-[91vw] sm:block sm:ml-6">
                            <div className="flex items-center justify-around sm:space-x-4 h-full w-full px-auto ">
                                {[{ name: "Home", path: "/" }, { name: "Teams", path: "/teams" }, { name: "Logout" }].map((item, index) => (
                                    item.name === "Logout" && user ? <button key={index} onClick={handleLogout} className='text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:bg-gray-200' >
                                        {item.name}
                                    </button> :
                                        <Link key={index} to={item.name === "Logout" ? "/login" : item.path} className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                                            {item.name === "Logout" ? <>Login</> : <>{item.name}</>}
                                        </Link>
                                ))}
                                {user && (
                                    <button onClick={handleDelete} className="flex items-center justify-between text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                                        <div className="flex items-center">
                                            <span className="ml-1">Delete Account?</span>
                                        </div>
                                    </button>
                                )}
                                {user && (
                                    <Link to={'/edit/:' + user?._id} className="flex items-center justify-between text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                                        <div className="flex items-center">
                                            <span className="ml-1">Edit Account?</span>
                                        </div>
                                    </Link>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className="flex items-center sm:hidden">
                        <button onClick={toggleNavbar} className="text-gray-900 hover:text-gray-900 focus:outline-none focus:text-gray-900">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {[{ name: "Home", path: "/" }, { name: "Teams", path: "/teams" }, , { name: "Logout" }].map((item, index) => (
                            item.name === "Logout" && user ? <div key={index} onClick={handleLogout} className='block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200' >{item.name}</div> :
                                <Link key={index} to={item.name === "Logout" ? "/login" : item.path} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                                    {item.name === "Logout" ? <>Login</> : <>{item.name}</>}
                                </Link>
                        ))}
                        {user && (
                            <button onClick={handleDelete} className="flex items-center justify-between text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:bg-gray-200 w-full">
                                <div className="flex items-center">
                                    <span className="ml-1">Delete Account?</span>
                                </div>
                            </button>
                        )}
                        {user && (
                            <Link to={'/edit/:' + user.id} className="flex items-center justify-between text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:bg-gray-200 w-full">
                                <div className="flex items-center">
                                    <span className="ml-1">Edit Account?</span>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;