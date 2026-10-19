"use client";

import useHeaderHeight from "@/utils/useHeaderHeight"
import InfoBox from "./InfoBox"
import dynamic from "next/dynamic"

const MediaCarousel = dynamic(() => import("./MediaCarousel"), { ssr: false })

export default function ShowItem({ itemData, allLocs }){
  const headerHeight = useHeaderHeight();

  return(
    <div
      className="show-wrapper"
      style={{ paddingTop: headerHeight }}
      key={itemData.id}
    >
      <MediaCarousel
        item={itemData}
      />
      <InfoBox
        allLocs={allLocs}
        item={itemData}
        trackList={itemData.content_files_id3_tags}
      />
    </div>
  )
}
