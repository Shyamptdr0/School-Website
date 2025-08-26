import React from 'react';
import Image from "next/image";
import image from "@/assets/images.jpg";

export default function WhyUs() {
    return (
        <div className="mt-50 min-h-screen px-6 md:px-20">

            {/* Heading Section */}
            <h1 className="text-center text-5xl font-bold mb-8">About Us</h1>
            <p className="text-lg text-gray-700 mb-12 mr-20 ml-20 ">
                Krishna Academy School is located surrounding 100 villages in a 35 km diameter. Our main objective is to
                develop rural students whose parents may not be fully aware of the importance of education. We aim to
                provide them with value-based quality education. It is our endeavor to mold our students to be compassionate,
                progressive, and professionally successful human beings responsive to Indian culture and heritage, in an environment
                of sharing and caring. We believe that every child has a talent, which, when fostered in a conducive environment,
                enhances their overall development. We strive to provide a lively, warm, and purposeful atmosphere for the pursuit of excellence.
                <br/><br/>
                The KRISHNA ACADEMY aims to enable all students to achieve their full potential academically, physically, and spiritually.
                It is our mission to prepare children for the best colleges in the country and abroad, offering a stimulating environment
                to study and excel.
            </p>

            {/* Why Choose Us Section */}
            <div className="flex flex-col md:flex-row items-center gap-10">

                {/* Image */}
                <div className="flex-1 ml-20">
                    <Image
                        src={image}
                        alt="School Image"
                        className="rounded-lg object-cover w-[300] h-[300]"
                    />
                </div>

                {/* Text */}
                <div className="flex-1 mr-10">
                    <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
                    <p className="text-gray-700">
                        Students are encouraged to participate in class activities such as singing, drawing, coloring,
                        writing, group games, clay modeling, puzzles, and recitation. Poems and stories are dramatized
                        using expressive actions. Nature walks and regular educational tours to Zoos, Museums, and Game Parks
                        develop a sense of openness towards the world. The curriculum is research-oriented, and learning opportunities
                        are provided through worksheets, laboratory and library time, computer sessions, and small group discussions.
                        Personality development is emphasized through academic knowledge, the ability to question, sensory experiences,
                        and honing creative expressions.
                    </p>
                </div>

            </div>
        </div>
    );
}
