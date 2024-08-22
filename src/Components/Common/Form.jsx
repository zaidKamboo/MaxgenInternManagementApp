import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import backendHost from '../../Api';
import editIntern from "../../Database/editIntern"
import deleteIntern from "../../Database/deleteIntern"
import addIntern from "../../Database/addIntern"

const Form = ({ type }) => {
    const intern = useSelector(store => store?.intern);
    const [name, setName] = useState('');
    const [domain, setDomain] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [duration, setDuration] = useState('');
    const [technologies, setTechnologies] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if ((type === "Edit" || type === "Delete") && intern) {
            setName(intern?.name);
            setDomain(intern?.domain);
            setStartDate(intern?.startDate);
            setEndDate(intern?.endDate);
            setDuration(intern?.duration);
            setTechnologies(intern?.technologies.join(" "));
        }
    }, [type, intern]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const internData = { name, domain, startDate, endDate, duration, technologies: technologies.split(" ") };
        try {
            if (type === "Edit") {
                //     backendHost.post(`/intern/editIntern/${intern._id}`, internData)
                //         .then(res => {
                //             console.log(res?.data)
                //             navigate("/")
                //         })
                //         .catch(err => {
                //             console.log(err?.message, err)
                //         })
                const res = await editIntern(intern?._id, internData)
                navigate("/")
            } else if (type === "Delete") {
                // backendHost.delete(`/intern/deleteIntern/${intern?._id}`)
                //     .then(res => {
                //         console.log(res?.data)
                //         navigate("/")
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
                const res = await deleteIntern(intern?._id);
                navigate("/")
            } else {
                // backendHost.post("/intern/addIntern", internData)
                //     .then(res => {
                //         console.log(res?.data)
                //         navigate("/")
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
                const res = await addIntern(internData)
                navigate("/")
            }
        } catch (error) {
            console.error("Error handling submit:", error);
        }
    };

    return (
        <div className='px-[5vw] mt-10 max-w-screen'>
            <form onSubmit={handleSubmit} className='border border-t-cyan-400 border-transparent rounded-lg shadow-xl shadow-cyan-400 m-2 px-4 py-2 w-full mx-auto bg-slate-900'>
                <h1 className="text-center text-sky-300 my-7 text-2xl">
                    {!type && "Please fill the details to add intern information ..."}
                    {type === "Edit" && "Please Edit The details you want to :"}
                    {type === "Delete" && "Please click on \"Delete\" to delete intern..."}
                </h1>
                <div className='my-6 w-full flex justify-between'>
                    <label htmlFor="internName" className='text-sky-300 px-5'>Enter Intern Name Here:</label>
                    <input
                        id="internName"
                        type="text"
                        placeholder='NAME :'
                        onChange={(e) => { setName(e.target.value) }}
                        value={name}
                        className='px-3 mr-5 py-2 rounded-md outline-none shadow-black shadow-md bg-slate-800 border text-sky-300 focus:border-sky-300 w-[50%] border-cyan-500'
                    />
                </div>
                <div className='my-6 w-full flex justify-between'>
                    <label htmlFor="internDomain" className='text-sky-300 px-5'>Enter Intern Domain Here:</label>
                    <input
                        id="internDomain"
                        type="text"
                        placeholder='Domain :'
                        onChange={(e) => { setDomain(e.target.value) }}
                        value={domain}
                        className='px-3 mr-5 py-2 rounded-md outline-none shadow-black shadow-md bg-slate-800 border text-sky-300 focus:border-sky-300 w-[50%] border-cyan-500'
                    />
                </div>
                <div className='my-6 w-full flex justify-between'>
                    <label htmlFor="startDate" className='text-sky-300 px-5'>Enter Intern Course Start Date Here:</label>
                    <input
                        id="startDate"
                        type="text"
                        placeholder='Start date :'
                        onChange={(e) => { setStartDate(e.target.value) }}
                        value={startDate}
                        className='px-3 mr-5 py-2 rounded-md outline-none shadow-black shadow-md bg-slate-800 border text-sky-300 focus:border-sky-300 w-[50%] border-cyan-500'
                    />
                </div>
                <div className='my-6 w-full flex justify-between'>
                    <label htmlFor="endDate" className='text-sky-300 px-5'>Enter Intern Course End Date Here:</label>
                    <input
                        id="endDate"
                        type="text"
                        placeholder='End date :'
                        onChange={(e) => { setEndDate(e.target.value) }}
                        value={endDate}
                        className='px-3 mr-5 py-2 rounded-md outline-none shadow-black shadow-md bg-slate-800 border text-sky-300 focus:border-sky-300 w-[50%] border-cyan-500'
                    />
                </div>
                <div className='my-6 w-full flex justify-between'>
                    <label htmlFor="courseDuration" className='text-sky-300 px-5'>Enter Intern Course Duration Here:</label>
                    <input
                        id="courseDuration"
                        type="text"
                        placeholder='Course Duration :'
                        onChange={(e) => { setDuration(e.target.value) }}
                        value={duration}
                        className='px-3 mr-5 py-2 rounded-md outline-none shadow-black shadow-md bg-slate-800 border text-sky-300 focus:border-sky-300 w-[50%] border-cyan-500'
                    />
                </div>
                <div className='my-6 w-full flex justify-between'>
                    <label htmlFor="technologies" className='text-sky-300 px-5'>Enter Technologies used in Course Here: (separated by spaces)</label>
                    <input
                        id="technologies"
                        type="text"
                        placeholder='Course Technologies :'
                        onChange={(e) => { setTechnologies(e.target.value) }}
                        value={technologies}
                        className='px-3 mr-5 py-2 rounded-md outline-none shadow-black shadow-md bg-slate-800 border text-sky-300 focus:border-sky-300 w-[50%] border-cyan-500'
                    />
                </div>
                <div className='flex justify-center my-6'>
                    <input type='submit' className='transition-all duration-75 text-xl text-slate-950 px-16 py-4 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-500 hover:bg-gradient-to-br hover:text-black hover:from-blue-500 hover:via-cyan-500 hover:to-blue-500' value={!type ? "Add" : type} />
                </div>
            </form>
        </div>
    );
}

export default Form;
