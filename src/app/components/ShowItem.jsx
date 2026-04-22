"use client";

import useHeaderHeight from "@/utils/useHeaderHeight"
import InfoBox from "./InfoBox"
import Reveal from "./Reveal"
import dynamic from "next/dynamic"
import Link from "next/link"

const MediaCarousel = dynamic(() => import("./MediaCarousel"), { ssr: false })

export default function ShowItem({ itemData }){
  const headerHeight = useHeaderHeight();

  return(
    <div
      className="show-wrapper"
      style={{ paddingTop: headerHeight }}
    >
      <MediaCarousel item={itemData} />
      <InfoBox
        item={itemData}
      />
      <Reveal className="copyright-wrapper">
        <div>
          <div>For all rights holder inquiries, please contact us <Link href={"mailto:albinacommunityarchive@gmail.com"} target="_blank">here.</Link></div>
          <div>See <Link className="dev-policy-link" href={`/terms-of-use`}>Copyright, Terms of Use & Policies </Link>for more information. </div>
        </div>
      </Reveal>
    </div>
  )
}
