"use client";

import React from "react";
import bgImage from "../assets/krishnaPhoto.webp";
import Image from "next/image";
import photo from "../assets/photo.webp";
import { Card, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import image from "../assets/logo1.webp";
import { AnimatedGridPatternDemo } from "@/components/AnimatedGrid";

export default function Hero() {
    return (
        <div className="relative">
            {/* Animated Grid Background */}


            {/* Hero Section */}
            <section
                className="relative flex items-center justify-center w-full max-w-[1200px] h-[450px] mx-auto min-h-screen mt-50 rounded-2xl overflow-hidden"
                style={{
                    background: `url(${bgImage.src}) lightgray center center / cover no-repeat`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 text-center text-white px-6">
                    <h1 className="text-3xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                        Krishna Academy Dhargoan
                    </h1>
                    <a
                        href="/contact"
                        className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-lg font-semibold rounded-lg shadow-lg transition"
                    >
                        Contact Us
                    </a>
                </div>
            </section>

            {/* About Section */}
            <section className="py-12 px-6">
                <div className="flex items-center justify-center w-full max-w-6xl mx-auto gap-10 flex-col md:flex-row">
                    <div className="flex-1 flex justify-center">
                        <Image
                            src={photo}
                            alt="photo"
                            width={500}
                            height={500}
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg md:text-xl font-medium leading-relaxed text-gray-700">
                            There is no better School than Childhood & there is no better teacher
                            than Curiosity. We focus on nurturing the childhood of your children
                            & try to answer their curious questions.
                        </h2>
                    </div>
                </div>
            </section>


            {/* Cards Section */}
            <section className="py-12 px-6 items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Card 1 */}
                    <Card
                        isFooterBlurred
                        className="border-none relative overflow-hidden w-[230px] h-[250px] rounded-lg"
                        style={{
                            backgroundImage: `url(${image.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex flex-col items-center justify-center gap-3">
                            <h3 className="text-2xl font-bold text-white">Curriculum 9 – 10</h3>
                        </div>
                        <CardFooter className="cursor-pointer text-center  before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className="text-tiny text-white/80 text-center">Read More</p>
                        </CardFooter>
                    </Card>

                    {/* Card 2 */}
                    <Card
                        isFooterBlurred
                        className="border-none relative overflow-hidden w-[230px] h-[250px] rounded-lg"
                        style={{
                            backgroundImage: `url(${image.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex flex-col items-center justify-center gap-3">
                            <h3 className="text-2xl font-bold text-white">Curriculum 11 – 12</h3>
                        </div>
                        <CardFooter className="cursor-pointer text-center  before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className="text-tiny text-white/80 text-center">Read More</p>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            <div className="absolute inset-0 -z-10">
                <AnimatedGridPatternDemo />
            </div>

        </div>
    );
}
