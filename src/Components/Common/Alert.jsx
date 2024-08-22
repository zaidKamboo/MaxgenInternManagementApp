// Alert.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideAlert } from '../Store/Slices/alertSlice';

const Alert = () => {
    const dispatch = useDispatch();
    const { message, type, show } = useSelector((store) => store?.alertState);

    const handleClose = () => {
        dispatch(hideAlert());
    };
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(hideAlert())
        }, 1500);
        return () => clearTimeout(timeout)
    }, [dispatch, show])

    return (
        show && (
            <div
                className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white flex items-center justify-between ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}
            >
                <span>{message}</span>
                <button
                    onClick={handleClose}
                    className="ml-4 bg-transparent text-white font-semibold py-1 px-2 border border-white rounded hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out"
                >
                    Close
                </button>
            </div>
        )
    );
};

export default Alert;
