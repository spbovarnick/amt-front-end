"use client";

import Image from "next/image"
import MobileNavSearch from "./MobileNavSearch";
import MobileNavSlideMenu from "./MobileNavSlideMenu";
import logo from "@/../public/images/AMT-Logo.png"
import { useState } from "react";


const MobileNav = ({}) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="mobile-nav">
            <MobileNavSearch
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                menuOpen={menuOpen}
            />
            <div className={`nav-logo fader ${searchOpen ? "hidden" : "not-hidden"}`}>
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
            </div>
            <div className={`fader`}>
                <MobileNavSlideMenu
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    searchOpen={searchOpen}
                />
            </div>
        </nav>
    )
}

export default MobileNav