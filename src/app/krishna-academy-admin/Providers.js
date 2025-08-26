"use client";

import { SessionProvider, signOut } from "next-auth/react";
import { useEffect } from "react";

export function AuthProvider({ children }) {
    useEffect(() => {
        // Mark this tab as active
        sessionStorage.setItem("admin-active", "true");

        // On tab close → clear flag + force logout
        const handleUnload = () => {
            sessionStorage.removeItem("admin-active");
            // Broadcast logout to other tabs
            const bc = new BroadcastChannel("auth");
            bc.postMessage("logout");
            bc.close();
        };
        window.addEventListener("beforeunload", handleUnload);

        // Listen for logout events from other tabs
        const bc = new BroadcastChannel("auth");
        bc.onmessage = (event) => {
            if (event.data === "logout") {
                signOut({ callbackUrl: "/krishna-academy-admin/login" });
            }
        };

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
            bc.close();
        };
    }, []);

    return <SessionProvider>{children}</SessionProvider>;
}
