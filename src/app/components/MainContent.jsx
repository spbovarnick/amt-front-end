'use client';

import { startTransition, Suspense, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import AlbinaCommArchive from "./AlbinaCommArchive";
import DesktopSidebar from "./DesktopSidebar";
import HeroLanding from "./HeroLanding";
import { useSearchParams } from "next/navigation";
import useHeaderHeight from "@/utils/useHeaderHeight";

const EASE = [0.4, 0, 0.2, 1];

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

  const showHero = params.size < 1 && !hasInteracted;

  return (
    <div
      className="main-content-wrap"
      style={{ paddingTop: headerHeight }}
    >
      <Suspense fallback={null}>
        <AnimatePresence mode="wait" initial={false}>
          {showHero ? (
            <motion.div
              key="hero"
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: EASE }}
            >
              <HeroLanding handleInteraction={handleInteraction} />
            </motion.div>
          ) : (
            <motion.div
              key="archive"
              className="archive-layout"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <DesktopSidebar />
              <AlbinaCommArchive />
            </motion.div>
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  )
}

export default MainContent;