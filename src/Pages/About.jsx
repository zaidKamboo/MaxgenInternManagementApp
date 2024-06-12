import React from 'react';

const About = () => {
    return (
        <div className="bg-slate-950 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-7xl w-full bg-slate-900 rounded-lg shadow-lg p-6 sm:p-12 text-white">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">About Us</h1>
                <p className="text-lg sm:text-xl mb-4">
                    Welcome to the Intern Management Application, a platform designed to streamline the process of managing and tracking intern progress. Our goal is to provide an intuitive and efficient way for organizations to oversee their internship programs.
                </p>
                <p className="text-lg sm:text-xl mb-4">
                    Our application offers a range of features including intern tracking, performance reviews, project management, and communication tools. We aim to bridge the gap between interns and mentors, ensuring a productive and enriching internship experience for all parties involved.
                </p>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-slate-800 rounded-lg shadow-md p-4">
                            <img className="w-24 h-24 rounded-full mx-auto mb-4" src="team-member-1.jpg" alt="Team Member 1" />
                            <h3 className="text-xl font-bold text-center">John Doe</h3>
                            <p className="text-center">CEO & Founder</p>
                        </div>
                        <div className="bg-slate-800 rounded-lg shadow-md p-4">
                            <img className="w-24 h-24 rounded-full mx-auto mb-4" src="team-member-2.jpg" alt="Team Member 2" />
                            <h3 className="text-xl font-bold text-center">Jane Smith</h3>
                            <p className="text-center">CTO</p>
                        </div>
                        <div className="bg-slate-800 rounded-lg shadow-md p-4">
                            <img className="w-24 h-24 rounded-full mx-auto mb-4" src="team-member-3.jpg" alt="Team Member 3" />
                            <h3 className="text-xl font-bold text-center">Alice Johnson</h3>
                            <p className="text-center">Lead Developer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
