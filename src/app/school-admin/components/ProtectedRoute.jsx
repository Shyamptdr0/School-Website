// app/school-admin/ProtectedRoute.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = sessionStorage.getItem("admin-active");

        if (!session) {
            router.replace("/school-admin/login"); // redirect to login if no session
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) return <p>Loading...</p>;

    return <>{children}</>;
}
