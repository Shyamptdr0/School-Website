"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function SchoolChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "👋 Hello! Welcome to Krishna Academy. You can ask about admission, fees, or contact info.",
        },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
        });
        const data = await res.json();

        setMessages((m) => [...m, { sender: "bot", text: data.reply }]);
        setInput("");
    };

    return (
        <>
            {/* Floating Blinking WhatsApp Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition z-50 animate-pulse"
            >
                <FaWhatsapp size={28} />
            </button>

            {/* Chat Popup */}
            {isOpen && (
                <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-lg overflow-hidden z-50 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-green-500 text-white px-4 py-2">
                        <h3 className="font-semibold flex items-center gap-2">
                            <FaWhatsapp /> Krishna Academy
                        </h3>
                        <button onClick={() => setIsOpen(false)}>
                            <IoClose size={22} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm max-h-96">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-lg max-w-[75%] ${
                                    msg.sender === "user"
                                        ? "ml-auto bg-green-100 text-right"
                                        : "mr-auto bg-gray-100"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="flex border-t">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 p-2 text-sm outline-none"
                            placeholder="Type a message..."
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-green-500 text-white px-4 hover:bg-green-600"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
