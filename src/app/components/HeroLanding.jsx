"use client";

import heroPic from "@/../public/images/Archive-Hero.jpg"
import { useState } from "react";
import Image from "next/image";
import Search from "./Search";
import HeroFilter from "./HeroFilters";
import LoadingSpinner from "./LoadingSpinner";

const HeroLanding = ({}) => {
  const [cabinetOpen, setCabinetOpen] = useState(false)

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
        <div className="hero-search-filter">
          <Search
            onHero={true}
          />
          { !cabinetOpen &&
            <>
              <div
                className="hero-filter-toggle"
                onClick={() => setCabinetOpen(v => !v)}
              >
                ADVANCED SEARCH
              </div>
              <div className="mission-text">
                Our Community Archive includes photographs, film, recordings, ephemera, and oral histories—now totaling over 13,000 archived items, making it the largest archive dedicated to Black Oregonians’ cultural legacy in the state.
              </div>
            </>
          }
          { cabinetOpen &&
          <>
            <HeroFilter />
            <div
              className="hero-filter-toggle hide"
              onClick={() => setCabinetOpen(v => !v)}
            >
              HIDE ADVANCED SEARCH
            </div>
          </>
          }
        </div>
      </div>
    </div>
  )
}

export default HeroLanding;