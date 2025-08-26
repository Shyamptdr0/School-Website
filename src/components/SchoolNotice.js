"use client";

import React, { useState, useEffect } from "react";

export default function SchoolNotice() {
    const [open, setOpen] = useState(false);
    const [notice, setNotice] = useState(null);

    // Fetch latest notice from API
    const fetchNotice = async () => {
        try {
            const res = await fetch("/api/notice");
            if (res.ok) {
                const data = await res.json();
                if (data && data.isActive) {
                    setNotice(data);
                    setOpen(true); // open dialog only if notice exists
                }
            } else {
                console.error("Failed to fetch notice");
            }
        } catch (error) {
            console.error("Error fetching notice:", error);
        }
    };

    useEffect(() => {
        fetchNotice();
    }, []);

    const closeDialog = () => {
        setOpen(false);
    };

    if (!notice) return null; // do not render if no active notice

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg max-w-lg w-[90%] p-6 relative shadow-xl animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            📢 School Updates
                        </h2>
                        <p className="text-gray-700 mb-6 text-center whitespace-pre-line">
                            {notice.title}
                            {"\n"}
                            {notice.content}
                        </p>
                        <button
                            onClick={closeDialog}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-2xl"
                        >
                            &times;
                        </button>
                        <div className="flex justify-center">
                            <button
                                onClick={closeDialog}
                                className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-md transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
