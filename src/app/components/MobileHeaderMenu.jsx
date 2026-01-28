"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const MobileHeaderMenu = ({ isActive }) => {
  const [paddingTop, setPaddingTop] = useState(null);
  const padVal = paddingTop ?? ""

  useEffect(() => {
    const header = document.querySelector(".amt-header");
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
    <AnimatePresence initial={false}>

      <div
        className={`header-menu ${isActive ? "menu--isactive" : ""}`}
        style={{
          // paddingTop: `${paddingTop}px`,
        }}
      >

      </div>
    </AnimatePresence>
  )
}

export default MobileHeaderMenu;