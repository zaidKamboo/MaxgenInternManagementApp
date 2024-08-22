import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setInterns } from '../Store/Slices/internsSlice';
import getInterns from "../../Database/getAllInterns"
import { setIntern } from '../Store/Slices/internSlice';
import backendHost from '../../Api';
import { showAlert } from '../Store/Slices/alertSlice';

const Table = () => {
    const dispatch = useDispatch();
    const { interns } = useSelector(store => store.interns);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInterns = async () => {
            try {
                // backendHost.get("/intern/getInterns")
                //     .then(res => {
                //         dispatch(setInterns(res?.data?.interns));
                //     })
                //     .catch(err => {
                //         console.log(err)
                //         if (err?.message === 'Network Error') {
                //             dispatch(showAlert({ message: err?.message, type: 'danger', show: true }));
                //         } else {
                //             dispatch(showAlert({ message: err?.response?.data?.message, type: 'danger', show: true }));
                //         }
                //     })
                const res = await getInterns()
                console.log(res)
                dispatch(setInterns(res))
            } catch (error) {
                console.log(error.message);
                dispatch(showAlert({ message: error?.message, type: 'danger', show: true }))
            }
        };
        fetchInterns();
    }, []); 

    const handleDelete = (intern) => {
        dispatch(setIntern(intern));
        navigate(`/deleteIntern/${intern?._id}`);
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
                                    <th className="py-3 px-6 text-left text-cyan-400">Sr No</th>
                                    <th className="py-3 px-6 text-left text-cyan-400">Name</th>
                                    <th className="py-3 px-6 text-left text-cyan-400">Domain</th>
                                    <th className="py-3 px-6 text-left text-cyan-400">Start Date</th>
                                    <th className="py-3 px-6 text-left text-cyan-400">End Date</th>
                                    <th className="py-3 px-6 text-left text-cyan-400">Duration</th>
                                    <th className="py-3 px-6 text-left text-cyan-400">Technologies</th>
                                    <th className="py-3 px-6 text-left text-cyan-400">Edit</th>
                                    <th className="py-3 px-6 text-left text-cyan-400">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {interns?.map((intern, index) => (
                                    <tr
                                        key={intern._id}
                                        className={`border-1 border-black ${index % 2 === 0 ? 'bg-gradient-to-r from-cyan-400 via-white to-cyan-400 text-black' :
                                            // 'bg-gradient-to-r from-slate-950 via-black to-slate-950'
                                            'bg-black text-cyan-400'
                                            } hover:bg-gradient-to-r hover:from-slate-950 hover:via-cyan-950 hover:to-slate-950 transition duration-700 ease-in-out hover:text-slate-200
                                            
                                            `}
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
                                        <td
                                            className={`py-3 px-6 cursor-pointer ${index % 2 === 0 ? "text-emerald-500 bg-slate-950 hover:text-cyan-500" : "text-sky-400"}`}
                                            onClick={() => {
                                                dispatch(setIntern(intern));
                                                navigate(`/edit/${intern?._id}`);
                                            }}
                                        >
                                            Edit
                                        </td>
                                        <td className="py-3 px-6">
                                            <button className="text-red-600 cursor-pointer" onClick={() => handleDelete(intern)}>
                                                Delete
                                            </button>
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
