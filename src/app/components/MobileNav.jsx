"use client";

import Image from "next/image"
import MobileNavSearch from "./MobileNavSearch";
import logo from "@/../public/images/AMT-Logo.png"
import Hamburger from "@/../public/images/menu-hamburger.svg";
import { useState } from "react";


const MobileNav = ({}) => {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <nav className="mobile-nav">
            <MobileNavSearch
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
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
            <div className={` fader ${searchOpen ? "hidden" : "not-hidden"}`}>
                <Image
                    src={Hamburger.src}
                    alt="Hamburger menu icon"
                    className="mobile-nav-hamburger-icon"
                    width={30}
                    height={30}
                />
            </div>
        </nav>
    )
}

export default MobileNav