"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import {
    Home,
    LogOut,
    BookOpen,
    GraduationCap,
    Award,
    Images,
    PhoneCall,
    ChevronDown,
    ChevronRight,
    User,
    Files,
} from "lucide-react";

import AdminHeader from "@/app/krishna-academy-admin/components/Header";
import Image from "next/image";
import logo from "@/assets/logo.png";
import AllPages from "@/app/krishna-academy-admin/components/AllPages";

// Example dummy pages
const AboutPage = ({ page }) => (
    <div className="p-4">
        <AllPages />
    </div>
);

export default function SidebarDashboard() {
    const { data: session } = useSession();
    const [activePage, setActivePage] = useState("Home");
    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (title) => {
        setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    // Sidebar items with submenu support
    const items = [
        { title: "Home", icon: Home },
        { title: "Mandatory Disclosure", icon: Files },
        { title: "Faculties", icon: User },
        {
            title: "Admission",
            icon: GraduationCap,
            children: [
                "Admission Process",
                "School Timing",
                "Curriculum Scheme",
                {
                    title: "School Uniform",
                    children: ["Pre Primary Class", "Primary to Higher Class"],
                },
                "Fees Structure",
            ],
        },
        {
            title: "Academic",
            icon: BookOpen,
            children: [
                "Career",
                "Booklist",
                "Results",
                "Counseling Cell",
                "School Parenting",
            ],
        },
        {
            title: "Gallery",
            icon: Images,
            children: ["Photo"],
        },
        {
            title: "Achievements",
            icon: Award,
            children: ["Award List"],
        },
        { title: "Contact", icon: PhoneCall },
    ];

    // Recursive menu renderer
    const renderMenu = (menuItems) =>
        menuItems.map((item) => {
            if (typeof item === "string") {
                // ✅ leaf node (string)
                return (
                    <SidebarMenuItem key={item}>
                        <SidebarMenuButton
                            onClick={(e) => {
                                e.preventDefault(); // ⛔ prevent refresh/go home
                                setActivePage(item);
                            }}
                            className="cursor-pointer pl-6"
                        >
                            <span>{item}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            }

            if (item.children) {
                // ✅ menu with children
                const isOpen = openMenus[item.title] || false;
                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            onClick={(e) => {
                                e.preventDefault();
                                toggleMenu(item.title);
                            }}
                            className="cursor-pointer flex justify-between items-center"
                        >
                            <div className="flex items-center gap-2">
                                {item.icon && <item.icon className="h-5 w-5" />}
                                <span>{item.title}</span>
                            </div>
                            {isOpen ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </SidebarMenuButton>
                        {isOpen && (
                            <SidebarMenu className="ml-4">
                                {renderMenu(item.children)}
                            </SidebarMenu>
                        )}
                    </SidebarMenuItem>
                );
            }

            // ✅ normal menu item (no children)
            return (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        onClick={(e) => {
                            e.preventDefault(); // ⛔ prevent refresh/go home
                            setActivePage(item.title);
                        }}
                        className="cursor-pointer"
                    >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.title}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            );
        });

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                {/* Sidebar */}
                <Sidebar collapsible="icon">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className="flex items-center gap-2 text-xl font-bold text-black">
                                <Image
                                    src={logo}
                                    alt="Logo"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                <span className="group-data-[collapsible=icon]:hidden">
                  Krishna Academy
                </span>
                            </SidebarGroupLabel>

                            <SidebarGroupContent>
                                <SidebarMenu className="mt-4">
                                    {renderMenu(items)}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() =>
                                        signOut({
                                            redirect: true,
                                            callbackUrl: "/krishna-academy-admin/login",
                                        })
                                    }
                                    className="flex items-center gap-2 px-4 py-2 bg-sky-800 text-white rounded-md hover:bg-sky-900 hover:text-white cursor-pointer"
                                >
                                    <LogOut className="h-5 w-5" />
                                    Logout
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                {/* Main Content */}
                <main className="flex-1 flex flex-col">
                    <AdminHeader />
                    <div className="p-6 flex-1 overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">{activePage}</h1>
                            <SidebarTrigger />
                        </div>
                        {/* ✅ Load dynamic content */}
                        <AllPages activePage={activePage} />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
