"use client";

import React, { useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "@/components/animation/Book loading.json";

export default function LoadingAnimation({ onFinish }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 1000); // adjust duration to match animation

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Transparent overlay with blur */}
            <div className="absolute inset-0 backdrop-blur-md bg-white/10"></div>

            {/* Lottie animation */}
            <div className="relative z-10">
                <Lottie animationData={animationData} loop={false} />
            </div>
        </div>
    );
}
