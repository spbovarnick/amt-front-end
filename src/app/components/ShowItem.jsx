import InfoBox from "./InfoBox"
import MediaCarousel from "./MediaCarousel"
import Link from "next/link"

export default function ShowItem({ itemData }){

  return(
    <div className="show-wrapper">
      <MediaCarousel item={itemData} />
      <InfoBox
        item={itemData}
      />
      <div className="copyright-wrapper">
        <div>
          <div>For all rights holder inquiries, please contact us <Link href={"mailto:albinacommunityarchive@gmail.com"} target="_blank">here.</Link></div>
          <div>See <Link href={`/about#terms-of-use`}>Copyright, Terms of Use & Policies </Link>for more information. </div>
        </div>
      </div>
    </div>
  )
}