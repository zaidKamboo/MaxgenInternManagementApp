import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setInterns, toggleRefresh } from '../Store/Slices/internsSlice';
import { setIntern } from '../Store/Slices/internSlice';
import fetchData from '../../Database/getAllInterns';
import deleteIntern from '../../Database/deleteIntern';

const Table = () => {
    const dispatch = useDispatch();
    const { interns, refresh } = useSelector(store => store.interns);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const data = await fetchData(); // Wait for the data to be fetched
                dispatch(setInterns(data)); // Set the fetched data into the Redux store
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchDataAsync(); // Call the async function
    }, [dispatch, refresh]);


    const handleDelete = async (internId) => {
        const confirmed = window.confirm("Do you really want to delete this record?");
        if (confirmed) {
            const response = await deleteIntern(internId);
            if (response) {
                dispatch(toggleRefresh());
                navigate("/");
            } else {
                console.log("Failed to delete intern");
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
            <div className="w-full max-w-7xl p-4">
                <h1 className="text-3xl font-bold mb-5 text-center text-cyan-400">Interns Information</h1>
                <div className="shadow-2xl rounded-xl overflow-hidden shadow-cyan-400">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-black border border-black">
                            <thead>
                                <tr>
                                    <th className="py-3 px-6 text-left">Sr No</th>
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">Domain</th>
                                    <th className="py-3 px-6 text-left">Start Date</th>
                                    <th className="py-3 px-6 text-left">End Date</th>
                                    <th className="py-3 px-6 text-left">Duration</th>
                                    <th className="py-3 px-6 text-left">Technologies</th>
                                    <th className="py-3 px-6 text-left">Edit</th>
                                    <th className="py-3 px-6 text-left">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {interns.map((intern, index) => (
                                    <tr
                                        key={index}
                                        className={`border-1 border-black ${index % 2 === 0 ? 'bg-sky-950' : 'bg-slate-950'} hover:bg-gray-950 hover:text-red-500`}
                                    >
                                        <td className="py-3 px-6">{index + 1}</td>
                                        <td className="py-3 px-6">{intern?.name}</td>
                                        <td className="py-3 px-6">{intern?.domain}</td>
                                        <td className="py-3 px-6">{intern?.startDate}</td>
                                        <td className="py-3 px-6">{intern?.endDate}</td>
                                        <td className={`py-3 px-6 font-semibold ${intern?.duration === "6 months" ? "text-green-700" : ""} ${intern?.duration === "3 months" ? "text-yellow-700" : ""} ${intern?.duration === "1 month" ? "text-red-700" : ""}`}>
                                            {intern?.duration}
                                        </td>
                                        <td className="py-3 px-6">{intern?.technologies.join(', ')}</td>
                                        <td className="py-3 px-6 text-sky-400 cursor-pointer" onClick={() => {
                                            dispatch(setIntern(intern));
                                            navigate(`/edit/${intern?._id}`);
                                        }}>
                                            Edit
                                        </td>
                                        <td className="py-3 px-6">
                                            <Link className="text-red-600 cursor-pointer" onClick={() => handleDelete(intern._id)}>
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
