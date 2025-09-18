import React from 'react';
import Image from "next/image";
import image from "@/assets/images.jpg";

export default function WhyUs() {
    return (
        <div className="mt-50 min-h-screen px-6 md:px-20">

            {/* Heading Section */}
            <h1 className="text-center text-5xl font-bold mb-8">About Us</h1>
            <p className="text-lg text-gray-700 mb-12 mr-20 ml-20 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In volutpat arcu eget urna fermentum, vitae
                lacinia quam suscipit. Praesent in justo nec metus vulputate egestas ac vel purus. Donec sapien lorem,
                placerat quis nibh nec, maximus elementum justo. In hac habitasse platea dictumst. Sed vehicula sodales
                ornare. Nullam ut rutrum magna, vitae pellentesque risus. Sed consequat eros libero, eget efficitur
                purus rutrum et. Nam vel posuere augue. Nunc accumsan vestibulum mi sit amet porta. Nunc iaculis odio
                justo, nec hendrerit nisi interdum non. Integer volutpat mauris volutpat, porttitor mi quis, porta
                massa. Sed quis accumsan orci. Aliquam sagittis venenatis neque.
            </p>


        </div>
    );
}
