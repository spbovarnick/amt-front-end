"use client";

import heroPic from "@/../public/images/Archive-Hero.jpg"
import { useState } from "react";
import Image from "next/image";
import Search from "./Search";
import useHeaderHeight from "@/utils/useHeaderHeight";

const HeroLanding = ({ handleInteraction }) => {
  const [cabinetOpen, setCabinetOpen] = useState(false)
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
              Our Community Archive includes photographs, film, recordings, ephemera, and oral histories—now totaling over 13,000 archived items, making it the largest archive dedicated to Black Oregonians’ cultural legacy in the state.
            </div>
          </>
        </div>
      </div>
    </div>
  )
}

export default HeroLanding;