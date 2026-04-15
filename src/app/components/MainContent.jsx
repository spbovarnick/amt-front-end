'use client';

import { startTransition, Suspense, useEffect, useState } from "react"
import AlbinaCommArchive from "./AlbinaCommArchive";
import DesktopSidebar from "./DesktopSidebar";
import HeroLanding from "./HeroLanding";
import { useSearchParams } from "next/navigation";
import useHeaderHeight from "@/utils/useHeaderHeight";

const MainContent = ({ }) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const params = useSearchParams();
  const headerHeight = useHeaderHeight();

  const handleInteraction = () => {
    sessionStorage.setItem('hasInteracted', 'true');
    setHasInteracted(true);
  }

  useEffect(() => {
    if (params.size >= 1 && !hasInteracted) {
      sessionStorage.setItem("hasInteracted", "true");
      startTransition(() => setHasInteracted(true));
    }
  }, [params]);

  return (
    <div
      className="main-content-wrap"
      style={{ paddingTop: headerHeight }}
    >
      <Suspense fallback={null}>
        { params.size < 1 && !hasInteracted ?
          <HeroLanding
            handleInteraction={handleInteraction}
          />
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