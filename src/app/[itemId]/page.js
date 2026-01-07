import { getItem } from "@/utils/api";
import Banner from "../components/Banner";
import ShowItem from "../components/ShowItem";

export default async function ItemIdPage({ params }){
  const { itemId } = await params
  const item = await getItem(itemId)


  return (
    <div className="page-wrapper --is-dark">
      {/* <Banner
        themeLight={false}
        alignLeft={true}
        headline="Albina<br/>Community Archive"
        subtitle="Documenting Albina's historic arts and culture legacy"
        className="--has-graphic --is-archive"
      /> */}
      <ShowItem
        itemData={item}
      />

    </div>
  )
}