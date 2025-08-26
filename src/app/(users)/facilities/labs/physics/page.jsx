import React from 'react';

export default function Physics() {
    return (
        <div className="min-h-screen px-6 md:px-20 mt-50    ">

            {/* Heading */}
            <h1 className="text-5xl font-bold text-center mb-16 text-blue-900">
                Physics Laboratory
            </h1>

            {/* Section 1: Image Left */}
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                <div className="flex-1 flex justify-center md:justify-start">
                    <div className="w-full h-96 bg-black rounded-xl shadow-lg flex items-center justify-center">
                        <span className="text-white text-xl">Physics Lab Image</span>
                    </div>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-gray-700 text-lg">
                        Our Physics Laboratory is a modern, fully-equipped facility designed to bring the principles of physics to life.
                        Students get hands-on experience with experiments in mechanics, optics, electricity, magnetism, and thermodynamics.
                        The lab is designed to make learning interactive, fun, and easy to understand.
                    </p>
                </div>
            </div>

            {/* Section 2: Text Only */}
            <div className="flex flex-col items-start gap-10 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-gray-700 text-lg">
                        The lab is furnished with modern apparatus including meters, lenses, pendulums, circuit kits, and advanced measurement tools.
                        Students are encouraged to perform both guided and independent experiments to develop critical thinking, problem-solving skills,
                        and a practical understanding of physical laws.
                        <br/>
                        Our instructors guide students in conducting experiments safely while encouraging curiosity and exploration.
                        The lab also supports project work, demonstrations, and science fairs, giving students an opportunity to apply
                        theoretical concepts in real-world scenarios.
                    </p>
                </div>

            </div>

            {/* Section 3: Image Right / Conclusion */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-12">
                <div className="flex-1 flex justify-center md:justify-end">
                    <div className="w-full h-96 bg-black rounded-xl shadow-lg flex items-center justify-center">
                        <span className="text-white text-xl">Advanced Physics Equipment</span>
                    </div>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-gray-700 text-lg">
                        Beyond routine experiments, the Physics Laboratory fosters creativity, analytical thinking, and scientific inquiry.
                        Students develop an appreciation for physics by observing phenomena, recording data, and interpreting results.
                        This hands-on approach ensures that students are not just learning physics—they are experiencing it.
                    </p>
                </div>
            </div>

        </div>
    );
}
