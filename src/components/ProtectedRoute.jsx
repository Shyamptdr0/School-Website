"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/krishna-academy-admin/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Loading...</p>; // could be a spinner
    }

    if (status === "unauthenticated") {
        return null; // prevent flicker
    }

    return <>{children}</>;
}
