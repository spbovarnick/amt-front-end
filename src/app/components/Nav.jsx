"use client";

import Logo from "@/../public/images/MOBILE_NAV_LOGO.png"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hamburger from "./Hamburger";
import MobileHeaderMenu from "./MobileHeaderMenu";


const Nav = ({}) => {
  const [isActive, setIsActive] = useState(false);

  const useHideOnScroll = ({ disabled }) => {
    const lastScrollY = useRef(0);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
      if (disabled) return;

      const onScroll = () => {
        const currentY = window.scrollY;

        if (currentY < 20) {
          setHidden(false);
          lastScrollY.current = currentY;
          return;
        }

        if (currentY > lastScrollY.current) {
          setHidden(true);
        } else {
          setHidden(false);
        }

        lastScrollY.current = currentY;
      }

      window.addEventListener("scroll", onScroll, { passive: true });

      return () => window.removeEventListener("scroll", onScroll);
    }, [disabled]);

    return hidden;
  }

  const hideHeader = useHideOnScroll({ disabled: isActive });

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
      <header className={`amt-header ${hideHeader && "hide-on-scroll"}`}>
        <div className="header-content">
          <Link href={"https://www.albinamusictrust.org/"}>
            <Image
              src={Logo}
              alt="AMT Logo"
              className="amt-logo-icon"
            />
          </Link>
          <div className="header-nav-wrapper">
            <nav className="header-nav-list">
              <div className="header-nav-list">
                <div className="header-nav-item">
                  <Link href={"/"}>Community Archive</Link>
                </div>
                <div className="header-nav-item">
                  <Link href={"albinamusictrust.org/projects"}>Projects</Link>
                </div>
                <div className="header-nav-item">
                  <Link href={"https://www.albinamusictrust.org/upcoming-events"}>Events</Link>
                </div>
                <div className="header-nav-item">
                  <Link href={"https://www.albinamusictrust.org/our-records"}>Records</Link>
                </div>
                <div className="header-nav-item">
                  <Link href={"https://www.albinamusictrust.org/about-us"}>About</Link>
                </div>
              </div>
            </nav>
          </div>
          <Hamburger
            handleClick={() => setIsActive(v => !v)}
            isActive={isActive}
          />
        <div className="desktop-nav-cta">
          <Link href={"https://www.paypal.com/donate/?hosted_button_id=Y5CY72BKFT9VE"}>DONATE</Link>
        </div>
        </div>
      </header>
      <MobileHeaderMenu
        isOpen={isActive}
      />
    </>
  )
}

export default Nav;