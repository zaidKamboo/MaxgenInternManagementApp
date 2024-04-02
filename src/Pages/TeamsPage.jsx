// TeamsPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TeamCard from '../Components/TeamCard';
import { host } from '../CONSTANTS';
import { setAlert } from '../Store/Slices/alertSlice';
import { setTeam } from '../Store/Slices/teamSlice';
import { useNavigate } from 'react-router-dom';
// import { fetchTeams } from '../store/actions/teamActions';


function TeamsPage() {
    const dispatch = useDispatch();
    const teams = useSelector(state => state.team);
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.email)
            navigate("/login")
        else {
            fetch(host + "/api/teams/getAllTeams", {
                method: "GET", headers: {
                    'Content-Type': "application/json"
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res?.success) {
                        dispatch(setTeam(res?.teams));
                        dispatch(setAlert({ message: res?.alert, type: 'success', show: true }))
                        setTimeout(() => {
                            navigate('/teams');
                        }, 1000);
                    }
                })
                .catch(err => dispatch(setAlert({ type: 'danger', message: err?.message, show: true })))
        }
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Teams</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {teams.map((t, i) => (
                    <TeamCard key={i} team={t} />
                ))}
            </div>
        </div>
    );
}

export default TeamsPage;
