"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarDashboard from "../components/Sidebar";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem("admin_token"); // ✅ fixed
        if (!token) {
            router.replace("/school-admin/login");
        }
    }, [router]);

    return <SidebarDashboard />;
}
