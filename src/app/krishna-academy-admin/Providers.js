// app/krishna-academy-admin/Providers.jsx
"use client";

import { SessionProvider, signOut } from "next-auth/react";
import { useEffect } from "react";

export function AuthProvider({ children }) {
    useEffect(() => {
        // ✅ Mark this tab as logged in after successful login
        sessionStorage.setItem("admin-active", "true");

        // 🔹 Handle tab close → remove session
        const handleUnload = () => {
            sessionStorage.removeItem("admin-active"); // remove session for this tab
            const bc = new BroadcastChannel("auth");
            bc.postMessage("logout"); // broadcast logout to other tabs
            bc.close();
        };

        window.addEventListener("beforeunload", handleUnload);

        // 🔹 Listen for logout events from other tabs
        const bc = new BroadcastChannel("auth");
        bc.onmessage = (event) => {
            if (event.data === "logout") {
                signOut({
                    redirect: true,
                    callbackUrl: "/krishna-academy-admin/login",
                });
            }
        };

        // 🔹 Cleanup listeners on unmount
        return () => {
            window.removeEventListener("beforeunload", handleUnload);
            bc.close();
        };
    }, []);

    return <SessionProvider>{children}</SessionProvider>;
}
