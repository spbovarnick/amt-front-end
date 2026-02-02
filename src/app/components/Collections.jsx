'use client';

import Link from "next/link";
import DesktopSidebar from "./DesktopSidebar";
import useHeaderHeight from "@/utils/useHeaderHeight";

const Collections = ({ collections }) => {
  const groupedColl = collections.slice().sort((a,b) => a.name.localeCompare(b.name)).reduce((acc, c) => {
    const letter = c.name[0].toUpperCase();
    acc[letter] ??= [];
    acc[letter].push(c)
    return acc
  }, {})

  const headerHeight = useHeaderHeight();

  return (
    <div
      className="collections-layout"
      style={{ paddingTop: headerHeight}}
    >
      <DesktopSidebar />
      <div className="page-wrapper">
        <h3 className="">COLLECTIONS</h3>
        <div className="collections-columns">
          {Object.entries(groupedColl).map(([letter, items]) => (
            <div key={letter}>
              <div className="heading xl">{letter}</div>
              <ul

                className="collections-alpha-group"
              >
                {items.map(c => (
                  <li
                    key={c.id}
                    className="collections-li"
                  >
                    <Link
                      href={`/?collections=${encodeURIComponent(c.name)}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collections;