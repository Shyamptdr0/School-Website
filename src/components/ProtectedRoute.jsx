"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function ProtectedRoute({ children }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            router.push("/admin/login");
        } else {
            try {
                jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
            } catch {
                localStorage.removeItem("adminToken");
                router.push("/admin/login");
            }
        }
    }, [router]);

    return <>{children}</>;
}
