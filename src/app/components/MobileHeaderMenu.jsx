"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const MobileHeaderMenu = ({ isOpen }) => {
  const [paddingTop, setPaddingTop] = useState(null);
  const padVal = paddingTop ?? "0px"

  useEffect(() => {
    const header = document.querySelector(".header-content");
    if (!header) return;

    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setPaddingTop(entry.contentRect.height)
      }
    })

    observer.observe(header);

    return () => observer.disconnect();
  },[])


  return (
      <div
        className={`header-menu ${isOpen && "menu--open"}`}
        style={{
          paddingTop: padVal,
        }}
      >
        <div className="header-menu-bg"></div>
        <div className="header-menu-nav">
          <div className={`header-menu-nav-list ${isOpen && "menu--open"}`}>
            <div className={`header-menu-nav-folder ${isOpen && "menu--open"}`}>
              <div className="header-menu-nav-folder-content">
                <div className="header-menu-nav-wrapper">
                  <div className="header-menu-nav-item">
                    <Link href={"/"}>Archive</Link>
                  </div>
                  <div className="header-menu-nav-item">
                    <Link href={"https://www.albinamusictrust.org/projects"}>Projects</Link>
                  </div>
                  <div className="header-menu-nav-item">
                    <Link href={"https://www.albinamusictrust.org/upcoming-events"}>Events</Link>
                  </div>
                  <div className="header-menu-nav-item">
                    <Link href={"https://www.albinamusictrust.org/our-records"}>Record Label</Link>
                  </div>
                  <div className="header-menu-nav-item">
                    <Link href={"https://www.albinamusictrust.org/about-us"}>About</Link>
                  </div>
                </div>
              </div>
              <div className={`header-menu-cta ${isOpen && "menu--open"}`}>
                <Link href={"https://www.paypal.com/donate/?hosted_button_id=Y5CY72BKFT9VE"}>DONATE</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MobileHeaderMenu;