"use client";

import { SessionProvider, signOut } from "next-auth/react";
import { useEffect } from "react";

export function AuthProvider({ children }) {
    useEffect(() => {
        // When logging in, mark this tab as active
        if (!sessionStorage.getItem("admin-active")) {
            sessionStorage.setItem("admin-active", "true");
        }

        // On refresh: if no flag in sessionStorage, force logout
        if (!sessionStorage.getItem("admin-active")) {
            signOut({ callbackUrl: "/krishna-academy-admin/login" });
        }

        // Optional: sync logout across tabs
        const bc = new BroadcastChannel("auth");
        bc.onmessage = (event) => {
            if (event.data === "logout") {
                signOut({ callbackUrl: "/krishna-academy-admin/login" });
            }
        };

        return () => {
            bc.close();
        };
    }, []);

    return <SessionProvider>{children}</SessionProvider>;
}
