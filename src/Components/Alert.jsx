import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAlert } from "../Store/Slices/alertSlice";
import { motion, AnimatePresence } from "framer-motion";

const Alert = () => {
    const { message, show, type } = useSelector(store => store.alertr);
    const dispatch = useDispatch();

    const handleHideAlert = () => {
        dispatch(resetAlert());
    };

    useEffect(() => {
        let timer;
        if (show) {
            timer = setTimeout(() => {
                dispatch(resetAlert());
            }, 3000);
        }

        return () => clearTimeout(timer);
    }, [show, dispatch]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className="fixed z-50 inset-x-0 top-0 p-2 sm:p-4"
                >
                    <div className={` shadow-lg rounded-lg ${type === 'success' ? 'bg-green-300' : type === 'danger' ? 'bg-red-300' : 'bg-blue-200'} p-4 sm:p-6 flex justify-between items-center relative h-16`}>
                        <p className="text-gray-800 font-medium ">{message}</p>
                        <button
                            className="text-gray-800 hover:text-red-600 focus:outline-none relative"
                            onClick={handleHideAlert}
                            onMouseEnter={(e) => { e.currentTarget.querySelector('.close-text').classList.remove('hidden') }}
                            onMouseLeave={(e) => { e.currentTarget.querySelector('.close-text').classList.add('hidden') }}
                        >
                            <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                            <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-100 text-gray-600 p-1 rounded-md text-xs close-text hidden">Close</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Alert;
