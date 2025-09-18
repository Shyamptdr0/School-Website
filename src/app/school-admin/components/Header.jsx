import React from "react";
import logo from "../../../../src/assets/logo.png";
import Image from "next/image";

export default function AdminHeader() {
    return (
        <div className="flex items-center justify-between px-4 py-2 shadow-md bg-white">
            {/* Left: Logo */}
            <div className="flex items-center">
                <Image
                    src={logo}
                    alt="logo"
                    width={60}
                    height={60}
                    className=""
                />
            </div>

            {/* Right: Text */}
            <div className="text-lg font-semibold">
                Admin Panel
            </div>
        </div>
    );
}
