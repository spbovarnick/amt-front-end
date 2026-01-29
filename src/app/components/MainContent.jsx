'use client';

import { useEffect, useState } from "react";
import { Suspense } from "react"
import AlbinaCommArchive from "./AlbinaCommArchive";
import DesktopSidebar from "./DesktopSidebar";
import HeroLanding from "./HeroLanding";
import { useSearchParams } from "next/navigation";

const MainContent = ({ }) => {
  const params = useSearchParams();
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const headerEl = document.querySelector("header");
    const updateHeight = () => setHeaderHeight(headerEl?.offsetHeight || 0);

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  })

  return (
    <div
      className="main-content-wrap"
      style={{ paddingTop: headerHeight }}
    >
      <Suspense fallback={null}>
        { params.size < 1 ?
          <HeroLanding />
          :
          <>
            <DesktopSidebar />
            <AlbinaCommArchive />
          </>
        }
      </Suspense>
    </div>
  )
}

export default MainContent;