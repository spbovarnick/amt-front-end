"use client";

import Logo from "@/../public/images/MOBILE_NAV_LOGO.png"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Hamburger from "./Hamburger";
import MobileHeaderMenu from "./MobileHeaderMenu";

const Nav = ({}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    setIsActive(!isActive)
  }

  return (
    <header className="amt-header">
      <div className="header-content">
        <Link href={"https://www.albinamusictrust.org/"}>
          <Image
            src={Logo}
            alt="AMT Logo"
            className="amt-logo-icon"
          />
        </Link>
        <Hamburger
          handleClick={handleClick}
          isActive={isActive}
        />
      </div>
      <MobileHeaderMenu />
    </header>
  )
}

export default Nav;