"use client";

import Image from "next/image"
import MobileNavSearch from "./MobileNavSearch";
import MobileNavSlideMenu from "./MobileNavSlideMenu";
import logo from "@/../public/images/AMT-Logo.png"
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";


const MobileNav = ({}) => {
    const pathname = usePathname();
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [prevPathname, setPrevPathname] = useState(pathname);
    const menuOpenRef = useRef(null);
    const exitMenuRef = useRef(null);


    // event listener to close menu when user clicks outside open menu
    useEffect(() => {
        const clickListener = (e) => {
            if (menuOpenRef.current) {
                if (!menuOpenRef.current.contains(e.target) && e.target !== exitMenuRef.current) {
                    setMenuOpen(!menuOpen)
                }
            }
        }

        document.addEventListener("click", clickListener)

        return () => {
            document.removeEventListener("click", clickListener)
        }
    }, [menuOpen])

    // effect to lock body scroll while menu is open
    useLayoutEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }

        return () => {};
    }, [menuOpen]);


    // close menu on route change
    if (pathname !== prevPathname) {
        setPrevPathname(pathname);
        setMenuOpen(false);
    }

    return (
        <nav className="mobile-nav">
            <MobileNavSearch
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                menuOpen={menuOpen}
            />
            <Link href={"/"} className={`nav-logo fader ${searchOpen ? "hidden" : "not-hidden"}`}>
              <Image
                src={logo}
                alt="AMT Logo"
                className="amt-logo-icon"
              />
              <div className="nav-logo-text">
                <div>ALBINA</div>
                <div>COMMUNITY</div>
                <div>ARCHIVE</div>
              </div>
            </Link>
            <div className={`fader`}>
                <MobileNavSlideMenu
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    searchOpen={searchOpen}
                    menuOpenRef={menuOpenRef}
                    exitMenuRef={exitMenuRef}
                />
            </div>
        </nav>
    )
}

export default MobileNav