import { getItem } from "@/utils/api";
import ShowItem from "../components/ShowItem";

export default async function ItemIdPage({ params }){
  const { itemId } = await params
  const item = await getItem(itemId)


  return (
    <div className="page-wrapper --is-dark">
      <ShowItem
        itemData={item}
      />

    </div>
  )
}