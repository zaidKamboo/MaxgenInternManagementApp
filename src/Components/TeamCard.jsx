import React from 'react';

function TeamCard({ team }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-2">{team.name}</h2>
            <div className="flex flex-wrap">
                {team.members.map((member, index) => (
                    <div key={index} className="flex flex-col items-center mr-4 mb-4">
                        <img src={member.avatar} alt={member.first_name} className="w-8 h-8 rounded-full mb-1" />
                        <span>{member.first_name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamCard;
