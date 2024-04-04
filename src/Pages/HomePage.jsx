import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setFilters, setUsers, removeFromSelectedUsers, addToSelectedUsers, setSelectedUsers } from '../Store/Slices/usersSlice';
import { useNavigate } from 'react-router-dom';
import { setAlert } from '../Store/Slices/alertSlice';
import { host } from '../CONSTANTS';


function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const teamNameRef = useRef();
    const user = useSelector(store => store.user);
    const users = useSelector(state => state.users.users);
    const searchQuery = useSelector(state => state.users.searchQuery);
    const filters = useSelector(state => state.users.filters);
    const selectedUsers = useSelector(state => state.users.selectedUsers);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20);

    useEffect(() => {
        if (!user?.email) {
            navigate("/login");
        }
        fetch(host + "/api/users", { method: "GET", headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(res => {
                dispatch(setUsers(res.users));
            })
            .catch(err => dispatch(setAlert({ type: 'danger', message: err.message })));
    }, []);

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
        setCurrentPage(1);
    };

    const paginateUsers = (users, page, perPage) => {
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        return users.slice(startIndex, endIndex);
    };

    let filteredUsers = users;
    if (searchQuery) {
        filteredUsers = filteredUsers.filter(user =>
            user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    if (filters.domain) {
        filteredUsers = filteredUsers.filter(user => user.domain === filters.domain);
    }
    if (filters.gender) {
        filteredUsers = filteredUsers.filter(user => user.gender === filters.gender);
    }
    if (filters.available) {
        filteredUsers = filteredUsers.filter(user => {
            return user.available === Boolean(filters.available);
        });
        console.log(filteredUsers)
    }

    const handleAddToTeam = (user) => {
        const existingUser = selectedUsers.find(u => u.domain === user.domain);
        if (existingUser) {
            const alertMessage = `A user from domain "${user.domain}" is already added.`;
            dispatch(setAlert({ type: 'danger', message: alertMessage, show: true }));
        } else if (!user.available) {
            dispatch(setAlert({ type: 'danger', message: "Sorry ! This user is not available.", show: true }));
        } else {
            dispatch(addToSelectedUsers(user));
        }
    };

    const handleRemoveFromTeam = (userId) => {
        dispatch(removeFromSelectedUsers(userId));
    };

    const renderUserCards = () => {
        const paginatedUsers = paginateUsers(filteredUsers, currentPage, usersPerPage);
        return paginatedUsers.map((user, index) => (
            <div className="user-card p-4 border border-gray-300 rounded-md shadow-md hover:shadow-lg" key={index}>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold mb-2">{`${user.first_name} ${user.last_name}`}</h2>
                        <p className="text-gray-700 mb-1">Gender: {user.gender}</p>
                        <p className="text-gray-700 mb-1">Domain: {user.domain}</p>
                        <p className="text-gray-700 mb-1">Availability: {user.available ? 'Yes' : 'No'}</p>
                    </div>
                    <img src={user.avatar} alt="User Avatar" className="w-16 h-16 rounded-full border border-gray-300" />
                </div>
                {selectedUsers.find(selectedUser => selectedUser._id === user._id) ? (
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleRemoveFromTeam(user.id)}>
                        Remove from Team
                    </button>
                ) : (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleAddToTeam(user)}>
                        Add to Team
                    </button>
                )}
            </div >
        ));
    };

    const renderSelectedUsers = () => {
        return (
            <div>
                <h2 className="text-xl font-bold mb-4">Selected Users</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedUsers.map((user, index) => (
                        <div key={index} className="selected-user-card p-4 border border-gray-300 rounded-md shadow-md">
                            <h3 className="text-lg font-bold mb-2">{`${user.first_name} ${user.last_name}`}</h3>
                            <p className="text-gray-700 mb-1">Gender: {user.gender}</p>
                            <p className="text-gray-700 mb-1">Domain: {user.domain}</p>
                            <p className="text-gray-700 mb-1">Availability: {user.available ? 'Yes' : 'No'}</p>
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleRemoveFromTeam(user.id)}>
                                Remove from Team
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleFilterChange = (filterType, value) => {
        dispatch(setFilters({ ...filters, [filterType]: value }));
        setCurrentPage(1);
    };

    const handleCreateTeam = (e) => {
        e.preventDefault();
        try {
            if (selectedUsers.length < 1) {
                setAlert({ message: "There must be at least two members in the team.", type: "danger", show: true })
            } else {
                let members = selectedUsers.map(user => user._id);
                members.push(user._id)
                let name = teamNameRef.current.value;
                fetch(host + "/api/teams/createTeam", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, members })
                })
                    .then(res => res.json())
                    .then(res => {
                        dispatch(setSelectedUsers([]));
                        dispatch(setAlert({ message: res?.alert, show: true, type: 'success' }))
                        teamNameRef.current.value = ""
                        navigate("/teams")
                    })
                    .catch(err => setAlert({ type: 'danger', message: err.message, show: true }))
            }
        } catch (error) {
            setAlert({ type: 'danger', message: error.message, show: true })
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="search-section mb-8">
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </section>
            <center>
                <h3>All Filters</h3>
            </center>
            <section className="filter-section mb-8">
                <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">Domain</label>
                    <select aria-required onChange={(e) => handleFilterChange('domain', e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md">
                        <option value="">All</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Business Development">Business Development</option>
                        <option value="IT">IT</option>
                    </select>
                </div>
            </section>
            <section className="filter-section mb-8">
                <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select aria-required onChange={(e) => handleFilterChange('gender', e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md">
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </section>
            <section className="filter-section mb-8">
                <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">Availability</label>
                    <select aria-required onChange={(e) => handleFilterChange('available', e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md">
                        <option value="">All</option>
                        <option value="true">Available</option>
                    </select>
                </div>
            </section>
            <section className="user-cards-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderUserCards()}
            </section>

            <section className="pagination-section mt-8">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => handlePageChange(number)}
                        className={`mr-2 my-3 px-4 py-2 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                        {number}
                    </button>
                ))}
            </section>

            <section className="selected-users-section mt-8">
                {renderSelectedUsers()}
            </section>

            <section className="create-team-section mt-8">
                <form onSubmit={handleCreateTeam}>

                    <input ref={teamNameRef} minLength={3} className='my-3 p-2 w-full border border-gray-300 rounded-md' type="text" required placeholder='Enter Team name : ' />
                    <input type='submit' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" value="Create Team" />
                </form>
            </section>

            <section className="team-details-section mt-8">
                {/* Display team details */}
            </section>
        </div>
    );
}

export default HomePage;
