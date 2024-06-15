import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ name, email, subject, message });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
            <div className="w-full max-w-2xl p-8 shadow-2xl rounded-lg shadow-cyan-400 bg-slate-900">
                <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">Contact Us</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-sky-300">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-slate-800 border border-cyan-500 rounded-md text-sky-300 focus:ring-cyan-300 focus:border-cyan-300"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-sky-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-slate-800 border border-cyan-500 rounded-md text-sky-300 focus:ring-cyan-300 focus:border-cyan-300"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-sky-300">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-slate-800 border border-cyan-500 rounded-md text-sky-300 focus:ring-cyan-300 focus:border-cyan-300"
                            placeholder="Subject"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-sky-300">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                            className="mt-1 block w-full px-4 py-2 bg-slate-800 border border-cyan-500 rounded-md text-sky-300 focus:ring-cyan-300 focus:border-cyan-300"
                            placeholder="Your Message"
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-cyan-600 text-sky-100 rounded-full hover:bg-cyan-500 transition duration-300 ease-in-out"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
