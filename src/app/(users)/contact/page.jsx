import React from 'react';

export default function Contact() {
    return (
        <div className="min-h-screen px-6 md:px-20 py-16 bg-gray-50 mt-40">
            {/* Heading */}
            <h1 className="text-5xl font-bold text-center mb-16 text-blue-900">
                Contact Us
            </h1>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Form */}
                <form className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message
                        </label>
                        <textarea
                            rows="5"
                            placeholder="Write your message..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Send Message
                    </button>
                </form>

                {/* Contact Info */}
                <div className="flex flex-col justify-center space-y-6 bg-blue-900 text-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold">Get in Touch</h2>
                    <p>
                        Feel free to reach out to us through the form or using the details
                        below.
                    </p>
                    <div>
                        <p className="font-semibold">📍 Address:</p>
                        <p>123 Main Street, City, Country</p>
                    </div>
                    <div>
                        <p className="font-semibold">📞 Phone:</p>
                        <p>+1 234 567 890</p>
                    </div>
                    <div>
                        <p className="font-semibold">✉️ Email:</p>
                        <p>info@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
