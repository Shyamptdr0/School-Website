import React from 'react';

export default function Library() {
    return (
        <div className="min-h-screen px-6 md:px-20 mt-50">

            {/* Heading */}
            <h1 className="text-5xl font-bold text-center mb-12">Library Facility</h1>

            {/* Section 1: Image Left */}
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                <div className="flex-1 flex justify-center md:justify-start">
                    <div className="w-full h-96 bg-black rounded-md flex items-center justify-center">
                        <span className="text-white text-xl">Image Placeholder</span>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-gray-700">
                        The library at our school is a treasure trove of knowledge, an oasis of quiet contemplation, and a haven for curious minds.
                        It stands as a testament to our commitment to providing comprehensive resources for students across all courses and academic disciplines.
                        With an extensive collection of books, reference materials, digital resources, and periodicals, the library serves as a hub for academic research,
                        self-directed learning, and intellectual exploration.
                    </p>
                </div>
            </div>

            {/* Section 2: Image Right */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-12">
                <div className="flex-1 flex justify-center md:justify-end">
                    <div className="w-full h-96 bg-black rounded-md flex items-center justify-center">
                        <span className="text-white text-xl">Image Placeholder</span>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-gray-700">
                        Upon entering the library, students are greeted by a serene ambiance, with cozy reading nooks, comfortable seating,
                        and well-lit study areas that encourage focused learning and contemplation. The library’s spacious layout accommodates students
                        pursuing individual studies, group discussions, and collaborative projects, fostering an atmosphere of intellectual camaraderie.
                    </p>
                </div>
            </div>

            {/* Section 3: Image Left */}
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                <div className="flex-1 flex justify-center md:justify-start">
                    <div className="w-full h-96 bg-black rounded-md flex items-center justify-center">
                        <span className="text-white text-xl">Image Placeholder</span>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-gray-700">
                        The library’s shelves are lined with a diverse assortment of books, covering all courses and subjects taught at our school.
                        From textbooks and academic references to literary classics and contemporary fiction, the collection caters to the varied interests
                        and academic needs of our student body. The library takes pride in regularly updating its collection, ensuring that students have
                        access to the latest editions and publications.
                    </p>
                </div>
            </div>

            {/* Section 4: Image Right */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-12">
                <div className="flex-1 flex justify-center md:justify-end">
                    <div className="w-full h-96 bg-black rounded-md flex items-center justify-center">
                        <span className="text-white text-xl">Image Placeholder</span>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-gray-700">
                        Digital resources play an integral role in our library, offering access to an extensive array of e-books, online databases,
                        academic journals, and multimedia content. Students can browse through a vast repository of digital resources from their personal devices
                        or utilize library computers for research and academic purposes. This integration of digital and physical resources ensures that our
                        students have comprehensive and up-to-date information at their fingertips.
                    </p>
                </div>
            </div>

            {/* Section 5: Text Only / Conclusion */}
            <div className="mb-12">
                <p className="text-gray-700">
                    To support students’ academic endeavors further, the library provides access to specialized resources for advanced studies and research.
                    Whether students are delving into complex scientific topics, historical events, literary analyses, or cutting-edge technologies,
                    the library’s collection serves as an invaluable aid for in-depth exploration and comprehensive understanding.
                </p>
                <p className="text-gray-700 mt-4">
                    Librarians, equipped with vast knowledge and expertise, play a pivotal role in guiding students in utilizing the library’s resources effectively.
                    They assist students in locating relevant materials, conducting research, and honing their information literacy skills.
                    The library also conducts workshops and training sessions to help students navigate academic databases and cultivate critical thinking abilities.
                </p>
                <p className="text-gray-700 mt-4">
                    Beyond serving as an academic resource center, the library fosters an inclusive and welcoming space for all students.
                    It is a hub for creativity, imagination, and intellectual engagement, providing students with the tools they need to become well-rounded,
                    informed, and enlightened individuals.
                </p>
            </div>

        </div>
    );
}
