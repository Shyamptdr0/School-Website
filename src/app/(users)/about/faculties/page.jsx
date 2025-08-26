"use client";

import React, { useState, useEffect } from "react";

import {Button} from "@/components/ui/button";
import Image from "next/image";

export default function Faculties() {
    const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        // Fetch all faculties from API
        fetch("/api/faculty")
            .then((res) => res.json())
            .then(setFaculties)
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen p-4 md:p-6  mt-50">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Faculties</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-6 justify-items-center">
                {faculties.map((faculty) => (
                    <div
                        key={faculty._id}
                        className="border rounded-md shadow-sm w-44 flex flex-col items-center p-2 bg-white"
                    >
                        {/* Image container */}
                        <div className="w-40 h-48 overflow-hidden rounded-md border">
                            <Image
                                src={faculty.imageUrl }
                                alt={faculty.name}
                                width={144}
                                height={192}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Text */}
                        <h2 className="font-semibold mt-2 text-center text-sm">{faculty.name}</h2>
                        <p className="text-xs text-gray-600 text-center">{faculty.profession}</p>

                    </div>
                ))}
            </div>

            {faculties.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No faculties found.</p>
            )}
        </div>
    );
}
