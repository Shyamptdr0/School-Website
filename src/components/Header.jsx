"use client"

import * as React from "react"
import Image from "next/image"
import logo from "../assets/logo.png"
import {useScrollState} from "@/context/scrollContext"

// Font Awesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronRight, faChevronDown, faBars, faTimes} from "@fortawesome/free-solid-svg-icons"

// shadcn desktop nav
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export default function Header() {
    const {showTop} = useScrollState()
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [openDropdown, setOpenDropdown] = React.useState(null)
    const [openSubDropdown, setOpenSubDropdown] = React.useState(null)

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name)
        setOpenSubDropdown(null) // reset sub dropdown when switching
    }

    const toggleSubDropdown = (name) => {
        setOpenSubDropdown(openSubDropdown === name ? null : name)
    }

    return (
        <header
            className={`fixed w-full bg-white border-b-2 border-sky-600 z-40 transition-transform duration-500 ease-in-out
    ${showTop ? "md:top-14 top-0" : "top-0"}
  `}
        >

            <div className="flex items-center justify-between px-6 md:px-10 py-4">
                {/* Left Nav - hidden on mobile */}
                <div className="hidden md:flex">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList className="space-x-6 text-sky-900 font-medium">
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/" className="hover:text-sky-600">
                                    Home
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="bg-white shadow-lg rounded-md p-3 w-56 space-y-2">
                                        <li><NavigationMenuLink href="/about/vision">Vision &
                                            Mission</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/about/why-us">Why Us</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/about/president-message">President’s
                                            Message</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/about/managing-director">Managing Director’s
                                            Message</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/about/secretary">Secretary
                                            Message</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/about/principal">Academic Director /
                                            Principal</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/about/affiliation">Affiliation &
                                            Certification</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/about/disclosure">Mandatory
                                            Disclosure</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/about/faculties">Faculties</NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Facilities</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="bg-white shadow-lg rounded-md p-3 w-60 space-y-2">
                                        <li><NavigationMenuLink href="/facilities/library">Library</NavigationMenuLink>
                                        </li>
                                        <li>
                                            <div className="font-semibold">Laboratories</div>
                                            <ul className="pl-4 mt-1 space-y-1 text-sm">
                                                <li><NavigationMenuLink
                                                    href="/facilities/labs/biology">Biology</NavigationMenuLink></li>
                                                <li><NavigationMenuLink
                                                    href="/facilities/labs/physics">Physics</NavigationMenuLink></li>
                                                <li><NavigationMenuLink
                                                    href="/facilities/labs/chemistry">Chemistry</NavigationMenuLink>
                                                </li>
                                                <li><NavigationMenuLink
                                                    href="/facilities/labs/computer">Computer</NavigationMenuLink></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Admission</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="bg-white shadow-lg rounded-md p-3 w-64 space-y-2">
                                        <li><NavigationMenuLink href="/admission/process">Admission
                                            Process</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/admission/timing">School
                                            Timing</NavigationMenuLink></li>
                                        <li><NavigationMenuLink
                                            href="/admission/curriculum">Curriculum</NavigationMenuLink></li>
                                        <li>
                                            <div className="font-semibold">School Uniform</div>
                                            <ul className="pl-4 mt-1 text-sm space-y-1">
                                                <li><NavigationMenuLink href="/admission/uniform/pre-primary">Pre
                                                    Primary</NavigationMenuLink></li>
                                                <li><NavigationMenuLink href="/admission/uniform/primary-higher">Primary
                                                    to Higher</NavigationMenuLink></li>
                                            </ul>
                                        </li>
                                        <li><NavigationMenuLink href="/admission/fees">Fees
                                            Structure</NavigationMenuLink></li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Logo */}
                <div className="flex-shrink-0">
                    <a href="/">
                        <Image src={logo} alt="School Logo" width={70} height={70}/>
                    </a>
                </div>

                {/* Right Nav - hidden on mobile */}
                <div className="hidden md:flex">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList className="space-x-6 text-sky-900 font-medium">
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Academic</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="bg-white shadow-lg rounded-md p-3 w-56 space-y-2">
                                        <li><NavigationMenuLink href="/academic/career">Career</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/academic/booklist">Booklist</NavigationMenuLink>
                                        </li>
                                        <li><NavigationMenuLink href="/academic/results">Results</NavigationMenuLink>
                                        </li>
                                        <li><NavigationMenuLink href="/academic/counseling">Counseling
                                            Cell</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/academic/parenting">School
                                            Parenting</NavigationMenuLink></li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Gallery</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="bg-white shadow-lg rounded-md p-3 w-48">
                                        <li><NavigationMenuLink href="/gallery/photo">Photographs</NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Achievements</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="bg-white shadow-lg rounded-md p-3 w-48">
                                        <li><NavigationMenuLink href="/achievements/awards">Award
                                            List</NavigationMenuLink></li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/contact" className="hover:text-sky-600">
                                    Contact
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="block md:hidden text-sky-900 text-2xl"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <FontAwesomeIcon icon={mobileOpen ? faTimes : faBars}/>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-sky-200 shadow-lg">
                    <ul className="flex flex-col p-4 space-y-3 text-sky-900 font-medium">
                        <li><a href="/" className="hover:text-sky-600">Home</a></li>

                        {/* About Us dropdown */}
                        <li>
                            <button
                                onClick={() => toggleDropdown("about")}
                                className="w-full flex justify-between items-center hover:text-sky-600"
                            >
                                About Us
                                <FontAwesomeIcon icon={openDropdown === "about" ? faChevronDown : faChevronRight}/>
                            </button>
                            {openDropdown === "about" && (
                                <ul className="pl-4 mt-2 space-y-1 text-sm">
                                    <li><a href="/about/vision">Vision & Mission</a></li>
                                    <li><a href="/about/why-us">Why Us</a></li>
                                    <li><a href="/about/president-message">President’s Message</a></li>
                                    <li><a href="/about/managing-director">Managing Director’s Message</a></li>
                                    <li><a href="/about/secretary">Secretary Message</a></li>
                                    <li><a href="/about/principal">Academic Director / Principal</a></li>
                                    <li><a href="/about/affiliation">Affiliation & Certification</a></li>
                                    <li><a href="/about/disclosure">Mandatory Disclosure</a></li>
                                    <li><a href="/about/faculties">Faculties</a></li>
                                </ul>
                            )}
                        </li>

                        {/* Facilities dropdown */}
                        <li>
                            <button
                                onClick={() => toggleDropdown("facilities")}
                                className="w-full flex justify-between items-center hover:text-sky-600"
                            >
                                Facilities
                                <FontAwesomeIcon icon={openDropdown === "facilities" ? faChevronDown : faChevronRight}/>
                            </button>
                            {openDropdown === "facilities" && (
                                <ul className="pl-4 mt-2 space-y-1 text-sm">
                                    <li><a href="/facilities/library">Library</a></li>

                                    {/* Submenu for Labs */}
                                    <li>
                                        <button
                                            onClick={() => toggleSubDropdown("labs")}
                                            className="w-full flex justify-between items-center"
                                        >
                                            Laboratories
                                            <FontAwesomeIcon
                                                icon={openSubDropdown === "labs" ? faChevronDown : faChevronRight}/>
                                        </button>
                                        {openSubDropdown === "labs" && (
                                            <ul className="pl-4 mt-2 space-y-1">
                                                <li><a href="/facilities/labs/biology">Biology Lab</a></li>
                                                <li><a href="/facilities/labs/physics">Physics Lab</a></li>
                                                <li><a href="/facilities/labs/chemistry">Chemistry Lab</a></li>
                                                <li><a href="/facilities/labs/computer">Computer Lab</a></li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Admission dropdown */}
                        <li>
                            <button
                                onClick={() => toggleDropdown("admission")}
                                className="w-full flex justify-between items-center hover:text-sky-600"
                            >
                                Admission
                                <FontAwesomeIcon icon={openDropdown === "admission" ? faChevronDown : faChevronRight}/>
                            </button>
                            {openDropdown === "admission" && (
                                <ul className="pl-4 mt-2 space-y-1 text-sm">
                                    <li><a href="/admission/process">Admission Process</a></li>
                                    <li><a href="/admission/timing">School Timing</a></li>
                                    <li><a href="/admission/curriculum">Curriculum</a></li>

                                    {/* Submenu for Uniform */}
                                    <li>
                                        <button
                                            onClick={() => toggleSubDropdown("uniform")}
                                            className="w-full flex justify-between items-center"
                                        >
                                            School Uniform
                                            <FontAwesomeIcon
                                                icon={openSubDropdown === "uniform" ? faChevronDown : faChevronRight}/>
                                        </button>
                                        {openSubDropdown === "uniform" && (
                                            <ul className="pl-4 mt-2 space-y-1">
                                                <li><a href="/admission/uniform/pre-primary">Pre Primary</a></li>
                                                <li><a href="/admission/uniform/primary-higher">Primary to Higher</a>
                                                </li>
                                            </ul>
                                        )}
                                    </li>

                                    <li><a href="/admission/fees">Fees Structure</a></li>
                                </ul>
                            )}
                        </li>

                        {/* Academic dropdown */}
                        <li>
                            <button
                                onClick={() => toggleDropdown("academic")}
                                className="w-full flex justify-between items-center hover:text-sky-600"
                            >
                                Academic
                                <FontAwesomeIcon icon={openDropdown === "academic" ? faChevronDown : faChevronRight}/>
                            </button>
                            {openDropdown === "academic" && (
                                <ul className="pl-4 mt-2 space-y-1 text-sm">
                                    <li><a href="/academic/career">Career</a></li>
                                    <li><a href="/academic/booklist">Booklist</a></li>
                                    <li><a href="/academic/results">Results</a></li>
                                    <li><a href="/academic/counseling">Counseling Cell</a></li>
                                    <li><a href="/academic/parenting">School Parenting</a></li>
                                </ul>
                            )}
                        </li>

                        {/* Gallery */}
                        <li>
                            <button
                                onClick={() => toggleDropdown("gallery")}
                                className="w-full flex justify-between items-center hover:text-sky-600"
                            >
                                Gallery
                                <FontAwesomeIcon icon={openDropdown === "gallery" ? faChevronDown : faChevronRight}/>
                            </button>
                            {openDropdown === "gallery" && (
                                <ul className="pl-4 mt-2 space-y-1 text-sm">
                                    <li><a href="/gallery/photo">Photographs</a></li>
                                </ul>
                            )}
                        </li>

                        {/* Achievements */}
                        <li>
                            <button
                                onClick={() => toggleDropdown("achievements")}
                                className="w-full flex justify-between items-center hover:text-sky-600"
                            >
                                Achievements
                                <FontAwesomeIcon
                                    icon={openDropdown === "achievements" ? faChevronDown : faChevronRight}/>
                            </button>
                            {openDropdown === "achievements" && (
                                <ul className="pl-4 mt-2 space-y-1 text-sm">
                                    <li><a href="/achievements/awards">Award List</a></li>
                                </ul>
                            )}
                        </li>

                        <li><a href="/contact" className="hover:text-sky-600">Contact</a></li>
                    </ul>
                </div>
            )}
        </header>
    )
}
