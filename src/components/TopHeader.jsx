"use client"
import { useScrollState } from "../context/scrollContext"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { faFacebookF, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link";

export default function TopHeader() {
  const { showTop } = useScrollState()

  return (
      <header
          className={`fixed top-0 w-full bg-white border-b-2 border-sky-400 z-50 shadow-sm transition-transform duration-500 ease-in-out ${
              showTop ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* ✅ Only show on desktop (md and up) */}
        <div className="hidden md:flex items-center justify-between px-6 py-3">

          {/* left */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-sky-800" />
              <span className="ml-2 text-sm text-sky-800">YOUR_SCHOOL_NAME@gmail.com</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-sky-800" />
              <span className="ml-2 text-sm text-sky-800">+91 987654321</span>
            </div>
            <span className="text-sm text-sky-800">CBSE</span>
          </div>

          {/* right */}
          <div className="flex items-center space-x-6">
            <Link href="/about/disclosure">
              <Button className="bg-sky-800 rounded-full cursor-pointer text-white">
                Mandatory Disclosure
              </Button>
            </Link>
            <Link href="/admission/fees">
              <Button className="bg-sky-800 rounded-full cursor-pointer text-white">
                Fees
              </Button>
            </Link>
            <div className="flex space-x-3">
              <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5 text-sky-800 hover:text-sky-600" />
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5 text-sky-800 hover:text-pink-500" />
              <FontAwesomeIcon icon={faYoutube} className="w-5 h-5 text-sky-800 hover:text-red-600" />
            </div>
          </div>
        </div>
      </header>
  )
}
