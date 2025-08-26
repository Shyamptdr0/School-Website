"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export default function TabLogoutPrompt() {
    const [showModal, setShowModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!isClosing) {
                e.preventDefault();
                setShowModal(true);
                // Chrome ignores custom messages, so just return
                e.returnValue = "";
                return "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isClosing]);

    const handleLogout = () => {
        setIsClosing(true); // allow unload
        signOut({ redirect: true, callbackUrl: "/krishna-academy-admin/login" });
    };

    const handleCancel = () => {
        setShowModal(false);
        setIsClosing(false); // prevent logout
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <h2 className="text-lg font-bold mb-4">Do you want to logout?</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Logout
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
