import React from 'react';
import Image from "next/image";
import visionImage from "@/assets/school img2.jpg";

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
                    width={400}
                    height={500}
                    className="mt-3 rounded-md"
                />
            </div>

            {/* Vision & Mission Section */}
            <div className="flex flex-col md:flex-row items-start justify-center p-6 gap-10 mr-10 ml-10">

                {/* Vision */}
                <div className="flex-1">
                    <h2 className="text-3xl font-semibold mb-4">Vision</h2>
                    <p className="text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra velit aliquet ligula
                        dapibus faucibus. Mauris blandit maximus mollis. Praesent commodo sapien nec nisi efficitur,
                        eget vehicula orci congue. Phasellus quis elit non nisl fringilla placerat. Mauris nec blandit
                        urna. Integer iaculis urna sem, in tempus nisi lobortis vel. Integer.
                    </p>
                </div>

                {/* Mission */}
                <div className="flex-1">
                    <h2 className="text-3xl font-semibold mb-4">Mission</h2>
                    <p className="text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra velit aliquet ligula
                        dapibus faucibus. Mauris blandit maximus mollis. Praesent commodo sapien nec nisi efficitur,
                        eget vehicula orci congue. Phasellus quis elit non nisl fringilla placerat. Mauris nec blandit
                        urna. Integer iaculis urna sem, in tempus nisi lobortis vel. Integer.
                    </p>
                </div>

            </div>
        </div>
    );
}
