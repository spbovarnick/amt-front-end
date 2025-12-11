import ModalCarousel from "./MediaCarousel"
import InfoBox from "./InfoBox"

export default function ShowItem({ itemData }){

  return(
    <div className="show-wrapper">
      <ModalCarousel item={itemData} />
      <InfoBox
        item={itemData}
      />
    </div>
  )
}