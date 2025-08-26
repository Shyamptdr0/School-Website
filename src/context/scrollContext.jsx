"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ScrollContext = createContext()

export function ScrollProvider({ children }) {
  const [showTop, setShowTop] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down → hide TopHeader
        setShowTop(false)
      } else {
        // scrolling up → show TopHeader
        setShowTop(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <ScrollContext.Provider value={{ showTop }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScrollState() {
  return useContext(ScrollContext)
}
