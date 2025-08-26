import React from "react";
import Image from "next/image"; // only if using Next.js
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import logo from "../assets/logo1.webp"; // adjust path to your logo file

export default function Footer() {
    return (
        <footer className="bg-sky-800 text-white py-12">
            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-10">
                {/* About Us */}
                <div>
                    {/* Logo */}
                    <div className="mb-4 inline-block bg-white p-2 rounded-lg">
                        <Image
                            src={logo}
                            alt="Krishna Academy Logo"
                            width={120}
                            height={120}
                            className="rounded-lg"
                        />
                    </div>

                    <h2 className="text-lg font-semibold mb-4">KNOW ABOUT US</h2>
                    <p className="text-sm leading-relaxed mb-6">
                        The KRISHNA ACADEMY aims to enable all the students to achieve their
                        full potential academically, physically and spiritually.
                    </p>

                    <div className="space-y-4 text-sm">
                        <div>
                            <p className="flex items-start gap-2">
                                <FaMapMarkerAlt className="mt-1" />
                                KRISHANA ACADEMY DHARGAON <br />
                                TEHSIL MAHESHWAR <br />
                                DISTRICT KHARGONE <br />
                                Pin 451221 <br />
                                MADHYA PRADESH
                            </p>
                        </div>
                        <div>
                            <p className="flex items-center gap-2">
                                <FaPhoneAlt /> +91-8120709899, +91-8717877855
                            </p>
                        </div>
                        <div>
                            <p className="flex items-center gap-2">
                                <FaEnvelope /> krishna.dhargaon@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Let’s Connect</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Facebook</a></li>
                        <li><a href="#" className="hover:underline">Instagram</a></li>
                        <li><a href="#" className="hover:underline">YouTube</a></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Admission Inquiry</a></li>
                        <li><a href="#" className="hover:underline">Photo Gallery</a></li>
                    </ul>
                </div>

                {/* Important Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Important Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">FAQs</a></li>
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom copyright */}
            <div className="border-t border-gray-400 mt-10 pt-4 text-center text-sm">
                Copyright © 2025 Krishna Academy Dhargaon | Develop and Designed By{" "}
                <span className="font-semibold cursor-pointer">Shreem Software Solutions</span>
            </div>
        </footer>
    );
}
