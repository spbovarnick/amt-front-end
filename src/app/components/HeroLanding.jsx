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
              Our community archive includes photographs, film, audio recordings, oral histories, and ephemera documenting Albina's arts and cultural legacy.
              <table className="tallies">
                <tbody>
                  <tr>
                    <td>
                        <TallyTicker count={heroCounts.files_count} />
                    </td>
                    <td>
                      Media Files
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <TallyTicker count={heroCounts.collections_count} />
                    </td>
                      <td>Collections</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        </div>
      </div>
    </div>
  )
}

export default HeroLanding;