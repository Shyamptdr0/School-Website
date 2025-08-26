import React from 'react';
import Image from "next/image";
import visionImage from "@/assets/vision-mission.webp";

export default function Vision() {
    return (
        <div className="min-h-screen mt-50">

            {/* Heading Section */}
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-center text-5xl font-bold">
                    Our Mission & Vision
                </h1>
                <Image
                    src={visionImage}
                    alt="Vision and Mission"
                    width={500}
                    height={600}
                    className="mt-5 rounded-md"
                />
            </div>

            {/* Vision & Mission Section */}
            <div className="flex flex-col md:flex-row items-start justify-center p-10 gap-10 mr-10 ml-10">

                {/* Vision */}
                <div className="flex-1">
                    <h2 className="text-3xl font-semibold mb-4">Vision</h2>
                    <p className="text-gray-700">
                        The vision of the education is to build a strong younger generation
                        with a sound body and a well-trained mind with good habits and accomplishments,
                        conducive to a full, purposeful, and noble life to blossom into an integrated personality.
                    </p>
                </div>

                {/* Mission */}
                <div className="flex-1">
                    <h2 className="text-3xl font-semibold mb-4">Mission</h2>
                    <p className="text-gray-700">
                        The mission of the school is to empower all its students to be problem solvers,
                        users of technology, effective communicators, and lifelong learners in a rapidly
                        changing global community by providing challenging experiences in a safe, caring,
                        supportive, and cooperative environment, preparing them to be successful and happy
                        in this highly competitive and challenging future global scenario.
                    </p>
                </div>

            </div>
        </div>
    );
}
