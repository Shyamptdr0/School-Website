import React from 'react';

export default function Biology() {
    return (
        <div className="min-h-screen px-6 md:px-20 mt-50">

            {/* Heading */}
            <h1 className="text-5xl font-bold text-center mb-16 text-blue-900">
                Biology Laboratory
            </h1>

            {/* Section 1: Image Left */}
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                <div className="flex-1 flex justify-center md:justify-start">
                    <div className="w-full h-96 bg-black rounded-xl shadow-lg flex items-center justify-center">
                        <span className="text-white text-xl">Image Placeholder</span>
                    </div>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-gray-700 text-lg">
                        Our school’s Biology Laboratory is a state-of-the-art facility designed to provide students with a hands-on learning experience.
                        The lab is equipped with modern microscopes, dissection kits, biological models, and other essential equipment to facilitate experiments
                        and practical learning for students across all grades.
                    </p>
                </div>
            </div>

            {/* Section 2: Image Right */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-12">
                <div className="flex-1 flex justify-center md:justify-end">
                    <div className="w-full h-96 bg-black rounded-xl shadow-lg flex items-center justify-center">
                        <span className="text-white text-xl">Image Placeholder</span>
                    </div>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-gray-700 text-lg">
                        The laboratory provides a safe and controlled environment where students can explore fundamental biological concepts, study living organisms,
                        and conduct experiments that reinforce classroom learning. Emphasis is placed on understanding anatomy, physiology, botany, zoology, and microbiology.
                    </p>
                </div>
            </div>

            {/* Section 3: Image Left */}
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                <div className="flex-1 flex justify-center md:justify-start">
                    <div className="w-full h-96 bg-black rounded-xl shadow-lg flex items-center justify-center">
                        <span className="text-white text-xl">Image Placeholder</span>
                    </div>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-gray-700 text-lg">
                        Students are encouraged to perform individual as well as group experiments, fostering collaboration, critical thinking, and analytical skills.
                        The lab sessions are designed to complement theoretical lessons, making biology more engaging and practical.
                    </p>
                </div>
            </div>

            {/* Section 4: Image Right */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-12">
                <div className="flex-1 flex justify-center md:justify-end">
                    <div className="w-full h-96 bg-black rounded-xl shadow-lg flex items-center justify-center">
                        <span className="text-white text-xl">Image Placeholder</span>
                    </div>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-gray-700 text-lg">
                        Qualified lab instructors supervise all experiments, ensuring safety protocols are followed while guiding students in proper laboratory techniques.
                        Regular demonstrations, project work, and research assignments are conducted to develop scientific curiosity and a deeper understanding of biological processes.
                    </p>
                </div>
            </div>

        </div>
    );
}
