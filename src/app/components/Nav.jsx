"use client";

import Logo from "@/../public/images/MOBILE_NAV_LOGO.png"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import MobileHeaderMenu from "./MobileHeaderMenu";

const Nav = ({}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!document) return;

    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => document.body.style.overflow = "";
  }, [isActive])

  return (
    <>
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
            handleClick={() => setIsActive(v => !v)}
            isActive={isActive}
          />
        </div>
      </header>
      <MobileHeaderMenu
        isOpen={isActive}
      />
    </>
  )
}

export default Nav;