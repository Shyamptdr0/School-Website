  "use client";

import React, {useState, useRef} from "react";
import Script from "next/script";
import Image from "next/image";
import photo from "../assets/school img1.jpg";
import {Card, CardFooter} from "@heroui/card";
import image from "../assets/logo1.webp";
import {AnimatedGridPatternDemo} from "@/components/AnimatedGrid";

// ✅ Carousel images
import img1 from "../assets/school-image1.jpg";
import img2 from "../assets/school-image2.jpg";
import img3 from "../assets/school-image3.jpg";
import img4 from "../assets/school-image4.jpg";

// ✅ Embla Carousel imports
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {Card as UiCard, CardContent} from "@/components/ui/card";
  import SchoolBot from "@/components/SchoolChat";

export default function Hero() {
    const [isOpen, setIsOpen] = useState(false);

    // ✅ carousel autoplay ref
    const plugin = useRef(Autoplay({delay: 2000, stopOnInteraction: true}));

    // ✅ Array of images
    const carouselImages = [img1, img2, img3, img4];

    // ✅ Cards data
    const cardsData = [
        {title: "Curriculum 9 – 10", link: "#"},
        {title: "Curriculum 11 – 12", link: "#"},
    ];

    return (
        <div className="relative">

            <SchoolBot/>
            {/* ✅ Chatbase Script */}
        {/*    <Script id="chatbase-config" strategy="afterInteractive">*/}
        {/*        {`*/}
        {/*  (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="IsBMyoA6uIrB_Ee-IstTW";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();*/}
        {/*`}*/}
        {/*    </Script>*/}

            {/* ✅ Hero Section with Carousel */}
            <section
                className="relative flex flex-col items-center justify-center w-full min-h-screen mt-20 overflow-hidden">
                <div className="w-full">
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-auto h-auto px-4 sm:px-10"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent>
                            {carouselImages.map((img, index) => (
                                <CarouselItem key={index} className="w-full">
                                    <div className="relative w-full h-[300px] sm:h-[500px]">
                                        <UiCard className="w-full h-full">
                                            <CardContent className="w-full h-full p-0">
                                                <Image
                                                    src={img}
                                                    alt={`School Slide ${index + 1}`}
                                                    fill
                                                    className="object-cover rounded-lg"
                                                    priority={index === 0}
                                                />
                                                {/* ✅ Overlay Content */}
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/30 rounded-lg">
                                                    <h2 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
                                                        Your School Name
                                                    </h2>
                                                    <a
                                                        href="/contact"
                                                        className="mt-6 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium shadow-md transition"
                                                    >
                                                        Contact Us
                                                    </a>
                                                </div>
                                            </CardContent>
                                        </UiCard>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                </div>
            </section>

            {/* ✅ About Section */}
            <section className="py-12 px-6">
                <div className="flex items-center justify-center w-full max-w-6xl mx-auto gap-10 flex-col md:flex-row">
                    <div className="flex-1 flex justify-center">
                        <Image
                            src={photo}
                            alt="Children learning at school"
                            width={500}
                            height={500}
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg md:text-xl font-medium leading-relaxed text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus urna vitae ante
                            bibendum, eget auctor risus tempor. Maecenas sed egestas velit. Aliquam sed nisi.
                        </h2>
                    </div>
                </div>
            </section>

            {/* ✅ Cards Section */}
            <section className="py-12 px-6 flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {cardsData.map((card, idx) => (
                        <Card
                            key={idx}
                            isFooterBlurred
                            className="border-none relative overflow-hidden w-[230px] h-[250px] rounded-lg"
                            style={{

                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div
                                className="absolute inset-0 backdrop-blur-sm bg-black/40 flex flex-col items-center justify-center gap-3">
                                <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                            </div>
                            <CardFooter
                                className="cursor-pointer text-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                <a
                                    href={card.link}
                                    className="text-tiny text-white/80 text-center"
                                >
                                    Read More
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

            {/* ✅ Background Pattern */}
            <div className="absolute inset-0 -z-10">
                <AnimatedGridPatternDemo/>
            </div>
        </div>
    );
}
