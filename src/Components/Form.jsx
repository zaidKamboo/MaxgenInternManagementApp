import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAlert } from '../Store/Slices/alertSlice';
import { userActions } from '../Store/Slices/userSlice';
import { host } from '../CONSTANTS';

function Form({ type }) {
    const user = useSelector(store => store.user)
    const dispatch = useDispatch();
    const fnRef = useRef();
    const lnRef = useRef();
    const emailRef = useRef()
    const passRef = useRef()
    const gnRef = useRef()
    const avRef = useRef()
    const dmRef = useRef()
    const alRef = useRef()
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            if (type === "Sign Up") {
                fetch(host + '/api/users', {
                    method: "POST",
                    headers: { "Content-Type": 'application/json' },
                    body: JSON.stringify({
                        first_name: fnRef.current.value,
                        last_name: lnRef.current.value,
                        email: emailRef.current.value,
                        password: passRef.current.value,
                        gender: gnRef.current.value,
                        avatar: avRef.current.value,
                        domain: dmRef.current.value,
                        available: alRef.current.value
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data?.success) {
                            dispatch(userActions.setUser(data?.user));
                            dispatch(setAlert({ type: 'success', message: data?.alert, show: true }))
                            navigate("/");
                        } else {
                            dispatch(setAlert({ type: 'danger', message: data?.alert, show: true }))
                        }
                    })
                    .catch(error => dispatch(setAlert({ type: 'danger', message: error?.message, show: true })));
            } else if (type === "Login") {
                fetch(host + '/api/users/login', {
                    method: "POST",
                    headers: { "Content-Type": 'application/json' },
                    body: JSON.stringify({
                        email: emailRef.current.value,
                        password: passRef.current.value,
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data?.success) {
                            dispatch(setAlert({ type: 'success', message: data?.alert, show: true }))
                            dispatch(userActions.setUser(data?.user));
                            navigate("/");
                        } else {
                            dispatch(setAlert({ type: 'danger', message: data?.alert, show: true }))
                        }
                    })
                    .catch(error => dispatch(setAlert({ type: 'danger', message: error?.message, show: true })));
            } else if (type === "Edit") {
                let passNo = false
                if (fnRef.current.value === "")
                    fnRef.current.value = user?.first_name;
                if (lnRef.current.value == "")
                    lnRef.current.value = user?.last_name;
                if (emailRef.current.value === "")
                    emailRef.current.value = user.email
                if (passRef.current.value === "")
                    passNo = true;
                if (gnRef.current.value === "")
                    gnRef.current.value = user?.gender
                if (avRef.current.value === "")
                    avRef.current.value = user?.avatar
                if (dmRef.current.value === "")
                    dmRef.current.value = user?.domain
                if (alRef.current.value === "")
                    alRef.current.value = user?.available
                fetch(host + '/api/users/' + user?._id, {
                    method: "PUT",
                    headers: { "Content-Type": 'application/json' },
                    body: JSON.stringify({
                        first_name: fnRef.current.value,
                        last_name: lnRef.current.value,
                        email: emailRef.current.value,
                        password: passRef.current.value,
                        gender: gnRef.current.value,
                        avatar: avRef.current.value,
                        domain: dmRef.current.value,
                        available: alRef.current.value,
                        passNo
                    })
                })
                    .then(response => response.json())
                    .then(res => {
                        if (res?.success) {
                            dispatch(setAlert({ type: 'success', message: res?.alert, show: true }))
                            dispatch(userActions.setUser(res?.user));
                            navigate("/");
                        } else {
                            dispatch(setAlert({ type: 'danger', message: res?.alert, show: true }))
                        }
                    })
                    .catch(error => dispatch(setAlert({ type: 'danger', message: error?.message, show: true })));
                fnRef.current.value = ""
                lnRef.current.value = ""
                gnRef.current.value = ""
                avRef.current.value = ""
                alRef.current.value = ""
                dmRef.current.value = ""
            }
        } catch (error) {
            dispatch(setAlert({ type: 'danger', message: error?.message, show: true }));
        }
        emailRef.current.value = "";
        passRef.current.value = "";
    }

    useEffect(() => {
        if (type === "Edit") {
            if (!user.email) {
                navigate("/login")
            }
        }
    }, [])
    return (
        <div className="container mx-auto px-4 py-8 ">
            <h1 className="text-3xl font-semibold text-gray-600  mb-4">
                <center>
                    Please {type} to continue...
                </center>
            </h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto border border-gray-300 rounded-md p-6 ">
                {
                    (type === "Sign Up" || type === "Edit") && (<>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input ref={fnRef} type="text"
                                required

                                minLength={3}
                                placeholder={user ? user.first_name : " "}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input ref={lnRef} type="text"
                                required={type !== "Edit"}
                                minLength={3}
                                placeholder={user ? user.last_name : ""}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                        </div>
                    </>)
                }
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input ref={emailRef} type="email"
                        required={type !== "Edit"}
                        minLength={3}
                        placeholder={user ? user.email : " "}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">{type === "Edit" && <>New</>} Password</label>
                    <input ref={passRef} type="password"
                        required={type !== "Edit"}
                        minLength={3}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                </div>
                {(type === "Sign Up" || type === "Edit") && (<>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select required={type !== "Edit"} ref={gnRef} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                        <input
                            required={type !== "Edit"}
                            minLength={3}
                            placeholder={user ? user.avatar : " "}
                            ref={avRef} type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Domain</label>
                        <input
                            required={type !== "Edit"}
                            minLength={3}
                            placeholder={user ? user.domain : " "}
                            ref={dmRef} type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Available</label>
                        <select ref={alRef} required={type !== "Edit"} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                            <option>true</option>
                            <option>false</option>
                        </select>
                    </div>
                </>)}
                <div className="mt-4 flex ">
                    <input type='submit' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" value={type} />
                    <span className='mt-2 mx-1' >
                        {type !== "Edit" && <>
                            {type === "Sign Up" ? <>Already Registered ?</> : <>New User ?</>}
                            <Link className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' to={type === "Sign Up" ? '/login' : "/signup"} >{type === "Sign Up" ? <>Login</> : <>Sign Up</>}
                            </Link>
                        </>}
                    </span>
                </div>
            </form>
        </div >
    );
}

export default Form;
