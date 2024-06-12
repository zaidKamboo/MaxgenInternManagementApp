import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleRefresh } from '../Store/Slices/internsSlice';
import addIntern from '../../Database/addIntern';
import editIntern from '../../Database/editIntern';

const Form = ({ type }) => {
    const intern = useSelector(store => store?.intern);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [domain, setDomain] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [duration, setDuration] = useState('');
    const [technologies, setTechnologies] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (type === "Edit" && intern) {
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
        const internData = { name, domain, startDate, duration, technologies: technologies.split(" "), endDate };

        if (type === "Edit") {
            const response = await editIntern(intern._id, internData);
            if (response) {
                dispatch(toggleRefresh());
                navigate("/");
            } else {
                console.log("Failed to edit intern");
            }
        } else {
            const response = await addIntern(internData);
            if (response) {
                setDuration("");
                setDomain("");
                setName("");
                setStartDate("");
                setTechnologies("");
                setEndDate("");
                dispatch(toggleRefresh());
                navigate("/");
            } else {
                console.log("Failed to add intern");
            }
        }
    };

    return (
        <div className='px-[5vw] mt-10 max-w-screen min-h-screen'>
            {type === "Edit" && <Link className="text-sky-400" to="/">Back to Home</Link>}
            <form onSubmit={handleSubmit} className='border rounded-lg shadow-md shadow-emerald-400 border-emerald-400 m-2 px-4 py-2 w-full mx-auto '>
                <h1 className="text-center text-sky-300 my-7 text-2xl">
                    {type === "Edit" ? <>Please Edit The details you want to : </> : <>Please fill the details to add intern information ...</>}
                </h1>
                <div className='my-6 w-full flex justify-between'>
                    <label htmlFor="internName" className='text-sky-300 px-5'>Enter Intern Name Here : </label>
                    <input
                        id="internName"
                        type="text"
                        placeholder='NAME : '
                        onChange={(e) => { setName(e.target.value) }}
                        value={name}
                        className='px-3 mr-5 py-2 rounded-md border-slate-800 outline-none shadow-black shadow-md bg-transparent border text-sky-300 focus:border-sky-300 w-[50%]'
                    />
                </div>
                <div className='my-6 w-full flex justify-between'>
                    <label htmlFor="internDomain" className='text-sky-300 px-5'>Enter Intern Domain Here : </label>
                    <input
                        id="internDomain"
                        type="text"
                        placeholder='Domain : '
                        onChange={(e) => { setDomain(e.target.value) }}
                        value={domain}
                        className='px-3 mr-5 py-2 rounded-md border-slate-800 outline-none shadow-black shadow-md bg-transparent border text-sky-300 focus:border-sky-300 w-[50%] '
                    />
                </div>
                <div className='my-6 w-full flex justify-between'>
                    <label htmlFor="startDate" className='text-sky-300 px-5'>Enter Intern Course Start Date Here : </label>
                    <input
                        id="startDate"
                        type="text"
                        placeholder='Start date : '
                        onChange={(e) => { setStartDate(e.target.value) }}
                        value={startDate}
                        className='px-3 mr-5 py-2 rounded-md border-slate-800 outline-none shadow-black shadow-md bg-transparent border text-sky-300 focus:border-sky-300  w-[50%]'
                    />
                </div>
                <div className='my-6 w-full flex justify-between'>
                    <label htmlFor="endDate" className='text-sky-300 px-5'>Enter Intern Course End Date Here : </label>
                    <input
                        id="endDate"
                        type="text"
                        placeholder='End date : '
                        onChange={(e) => { setEndDate(e.target.value) }}
                        value={endDate}
                        className='px-3 mr-5 py-2 rounded-md border-slate-800 outline-none shadow-black shadow-md bg-transparent border text-sky-300 focus:border-sky-300  w-[50%]'
                    />
                </div>
                <div className='my-6 w-full flex justify-between'>
                    <label htmlFor="courseDuration" className='text-sky-300 px-5'>Enter Intern Course Duration Here : </label>
                    <input
                        id="courseDuration"
                        type="text"
                        placeholder='Course Duration : '
                        onChange={(e) => { setDuration(e.target.value) }}
                        value={duration}
                        className='px-3 mr-5 py-2 rounded-md border-slate-800 outline-none shadow-black shadow-md bg-transparent border text-sky-300 focus:border-sky-300  w-[50%]'
                    />
                </div>
                <div className='my-6 w-full flex justify-between'>
                    <label htmlFor="technologies" className='text-sky-300 px-5'>Enter Technologies used in Course Here : (separated by spaces)</label>
                    <input
                        id="technologies"
                        type="text"
                        placeholder='Course Technologies : '
                        onChange={(e) => { setTechnologies(e.target.value) }}
                        value={technologies}
                        className='px-3 mr-5 py-2 rounded-md border-slate-800 outline-none shadow-black shadow-md bg-transparent border text-sky-300 focus:border-sky-300  w-[50%]'
                    />
                </div>
                <div className='flex justify-center my-6'>
                    <input type='submit' className='bg-black text-sky-400 px-12 py-1 rounded-full hover:bg-slate-950 hover:text-sky-300 hover:border hover:border-sky-300' />
                </div>
            </form>
        </div>
    );
}

export default Form;
