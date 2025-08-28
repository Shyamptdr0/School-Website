"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthProvider({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        // ✅ Run only on client after hydration
        if (typeof window === "undefined") return;

        // Skip check for login page
        if (pathname === "/krishna-academy-admin/login") {
            setLoading(false);
            return;
        }

        const token = sessionStorage.getItem("admin_token");

        if (!token) {
            setIsAuthed(false);
            router.replace("/krishna-academy-admin/login");
        } else {
            setIsAuthed(true);
        }

        setLoading(false);
    }, [pathname, router]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p>Checking authentication...</p>
            </div>
        );
    }

    // 🛑 Prevent children if not authed
    if (!isAuthed && pathname !== "/krishna-academy-admin/login") {
        return null;
    }

    return <>{children}</>;
}
