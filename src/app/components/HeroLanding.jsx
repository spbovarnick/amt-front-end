"use client";

import heroPic from "@/../public/images/Archive-Hero.jpg"
import Image from "next/image";
import Search from "./Search";
import useHeaderHeight from "@/utils/useHeaderHeight";
import TallyTicker from "./TallyTicker";

const HeroLanding = ({ handleInteraction, heroCounts }) => {
  const headerHeight = useHeaderHeight();

  return (
    <div className="hero-landing">
      <div className="hero-wrapper">
        <Image
          src={heroPic}
          fill
          alt="AMT's wall of sound"
          className="hero-landing-pic"
          style={{ objectFit: "cover" }}
        />
        <div
          className="hero-search-filter"
          style={{ top: `calc(${headerHeight}px + 3.3vmax)`}}
        >
          <h1 className="chunky-landing-title">COMMUNITY ARCHIVE</h1>
          <Search
            onHero={true}
          />
          <>
            <div
              className="hero-filter-toggle"
              onClick={() => handleInteraction()}
            >
              ADVANCED SEARCH
            </div>
            <div className="mission-text">
              Our Community Archive includes photographs, film, recordings, ephemera, and oral histories—now making it the largest archive dedicated to Black Oregonians’ cultural legacy in the state.
              <div className="tallies">
                <TallyTicker count={heroCounts.items_count} /> <span>Archive Items</span>
                <TallyTicker count={heroCounts.files_count} /> <span>Media Files</span>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  )
}

export default HeroLanding;