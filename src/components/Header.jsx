"use client"

import * as React from "react"
import Image from "next/image"
import logo from "../assets/logo.png"
import { useScrollState } from "../context/scrollContext"

// shadcn navigation
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

export default function Header() {
  const { showTop } = useScrollState()
  return (
    <header
    className={`fixed w-full bg-white border-b-2 border-sky-600 z-40 transition-transform duration-500 ease-in-out ${
      showTop ? "top-16" : "top-0"
    }`}
  >
  <div className="flex items-center justify-between px-10 py-3">
        
        {/* Left Navigation */}
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="space-x-6 text-sky-900 font-medium ">

            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="hover:text-sky-600">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* About Us */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="bg-white shadow-lg rounded-md p-3 w-56 space-y-2">
                  <li><NavigationMenuLink href="/about/vision">Vision & Mission</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/about/why-us">Why Us</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/about/president-message">President’s Message</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/about/managing-director">Managing Director’s Message</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/about/secretary">Secretary Message</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/about/principal">Academic Director / Principal</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/about/affiliation">Affiliation & Certification</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/about/disclosure">Mandatory Disclosure</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/about/faculties">Faculties</NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Facilities */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Facilities</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="bg-white shadow-lg rounded-md p-3 w-60 space-y-2">
                  <li><NavigationMenuLink href="/facilities/library">Library</NavigationMenuLink></li>
                  
                  {/* Sub menu with icon inline */}
                  <li>
                    <div className="flex items-center font-semibold">
                      Laboratories
                      <FontAwesomeIcon icon={faChevronRight} className="ml-2 text-sky-600 text-xs" />
                    </div>
                    <ul className="pl-4 mt-1 space-y-1 text-sm">
                      <li><NavigationMenuLink href="/facilities/labs/biology">Biology</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/facilities/labs/physics">Physics</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/facilities/labs/chemistry">Chemistry</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/facilities/labs/computer">Computer</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/facilities/labs/agriculture">Agriculture</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/facilities/labs/psychology">Psychology</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/facilities/labs/maths">Math’s</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/facilities/labs/sst">SST</NavigationMenuLink></li>
                    </ul>
                  </li>

                  <li><NavigationMenuLink href="/facilities/wifi">Wi-Fi Campus</NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Admission */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Admission</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="bg-white shadow-lg rounded-md p-3 w-64 space-y-2">
                  <li><NavigationMenuLink href="/admission/process">Admission Process</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/admission/timing">School Timing</NavigationMenuLink></li>
                  
                  {/* Curriculum submenu with icon */}
                      <li><NavigationMenuLink href="/admission/curriculum/">Curriculum</NavigationMenuLink></li>

                  {/* Uniform submenu with icon */}
                  <li>
                    <div className="flex items-center font-semibold">
                      School Uniform
                      <FontAwesomeIcon icon={faChevronRight} className="ml-2 text-sky-600 text-xs" />
                    </div>
                    <ul className="pl-4 mt-1 text-sm space-y-1">
                      <li><NavigationMenuLink href="/admission/uniform/pre-primary">Pre Primary</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/admission/uniform/primary-higher">Primary to Higher</NavigationMenuLink></li>
                    </ul>
                  </li>

                  <li><NavigationMenuLink href="/admission/fees">Fees Structure</NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* Logo in center */}
        <div className="px-6 flex-shrink-0">
          <a href="/">
            <Image src={logo} alt="School Logo" width={70} height={70} />
          </a>
        </div>

        {/* Right Navigation */}
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="space-x-6 text-sky-900 font-medium">
            
            {/* Academic */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Academic</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="bg-white shadow-lg rounded-md p-3 w-56 space-y-2">
                  <li><NavigationMenuLink href="/academic/career">Career</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/academic/booklist">Booklist</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/academic/results">Results</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/academic/counseling">Counseling Cell</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/academic/parenting">School Parenting</NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Gallery */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Gallery</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="bg-white shadow-lg rounded-md p-3 w-48">
                  <li><NavigationMenuLink href="/gallery/photo"> Photographs</NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Achievements */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Achievements</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="bg-white shadow-lg rounded-md p-3 w-48">
                  <li><NavigationMenuLink href="/achievements/awards">Award List</NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Contact */}
            <NavigationMenuItem>
              <NavigationMenuLink href="/contact" className="hover:text-sky-600">
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

      </div>
    </header>
  )
}
