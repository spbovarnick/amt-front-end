'use client';

import { Suspense } from "react"
import AlbinaCommArchive from "./AlbinaCommArchive";
import DesktopSidebar from "./DesktopSidebar";
import HeroLanding from "./HeroLanding";
import { useSearchParams } from "next/navigation";
import useHeaderHeight from "@/utils/useHeaderHeight";

const MainContent = ({ }) => {
  const params = useSearchParams();
  const headerHeight = useHeaderHeight();

  return (
    <div
      className="main-content-wrap"
      style={{ paddingTop: headerHeight }}
    >
      <Suspense fallback={null}>
        { params.size < 1 ?
          <HeroLanding />
          :
          <div className="archive-layout">
            <DesktopSidebar />
            <AlbinaCommArchive />
          </div>
        }
      </Suspense>
    </div>
  )
}

export default MainContent;