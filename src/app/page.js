export const dynamic = "force-dynamic";

import { Suspense } from "react";
import AlbinaCommArchive from "@/app/components/AlbinaCommArchive";
import { fetchAssociatedData } from "@/utils/api";

export const metadata = {
  title: "Albina Community Archive",
  description: "Welcome to the Albina Community Archive, a digital repository documenting Albina's arts and culture legacy. Our mission is to engage community members and mission-aligned organizations to preserve digital versions of the Albina community's historical materials.",
  metadataBase: 'https://albinacommunityarchive.org/',
  openGraph: {
    images: ['public/images/open-graph-img.jpg']
  },
};

export default async function Page(){
  const associatedData = await fetchAssociatedData();

  return(
    <>
    <Suspense >
      <AlbinaCommArchive 
        associatedData={associatedData} 
      />
    </Suspense>
    </>
  )
}