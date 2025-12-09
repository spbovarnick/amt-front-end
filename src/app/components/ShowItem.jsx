import ModalCarousel from "./ModalCarousel"

export default function ShowItem({ itemData }){

  return(
    <div className="show-wrapper">
      <ModalCarousel item={itemData} />
    </div>
  )
}