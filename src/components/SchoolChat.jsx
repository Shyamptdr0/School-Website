"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import schoolLogo from "../../public/logo.webp";

export default function SchoolBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hi! What can I help you with today? 😊", suggestions: ["Admission Process", "Fees Structure", "Facilities", "Contact"] },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function sendMessage(customText) {
        const userInput = customText || input;
        if (!userInput) return;

        setMessages((prev) => [...prev, { role: "user", text: userInput }]);

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await res.json();
        setMessages((prev) => [...prev, { role: "bot", text: data.reply, suggestions: data.suggestions }]);
        setInput("");
    }

    return (
        <>
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 cursor-pointer right-6 bg-black hover:bg-neutral-800 text-white p-4 rounded-full shadow-lg z-[9999]"
            >
                {isOpen ? "✖" : "💬"}
            </motion.button>

            {/* Chat Window */}
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="fixed bottom-20 right-6 w-80 md:w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[9999] h-[500px]"
                        // 👆 fixed total height (adjust 500px if needed)
                    >
                        {/* Header */}
                        <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2">
                                <Image src={schoolLogo} alt="School Logo" width={35} height={35} className="rounded-full" />
                                <span className="font-semibold text-gray-800 text-sm">SCHOOL NAME</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-500 cursor-pointer hover:text-gray-700">✖</button>
                        </div>

                        {/* Messages (scrollable middle) */}
                        <div className="flex-1 p-3 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}
                                >
                                    <div className="flex items-start gap-2">
                                        {msg.role === "bot" && (
                                            <Image src={schoolLogo} alt="Bot" width={28} height={28} className="rounded-full" />
                                        )}
                                        <div
                                            className={`px-3 py-2 rounded-xl text-sm ${
                                                msg.role === "user"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                    {msg.role === "bot" && msg.suggestions && (
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {msg.suggestions.map((s, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => sendMessage(s)}
                                                    className="px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-700 hover:bg-blue-100 transition"
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input (fixed bottom) */}
                        <div className="border-t flex items-center p-2 gap-2 shrink-0">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message..."
                                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            />
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => sendMessage()}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
                            >
                                ➤
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
}
