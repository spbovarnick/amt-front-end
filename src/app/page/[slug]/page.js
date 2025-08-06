import OrgPageArchive from "@/app/components/OrgPageArchive";
import { fetchPageData, fetchAssociatedData } from "@/utils/api";


export async function generateMetadata({ params, searchParams }, parent) {
  const pageData = params.slug && params.slug !== 'react_devtools_backend_compact.js.map' ? await fetchPageData(params.slug) : null;

  const previousImages = (await parent).openGraph?.images || [];

  if (pageData) {
    return {
      title: `${pageData?.title} | Albina Community Archive`,
      metadataBase: new URL(`https://albinacommunityarchive.org/page/${params.slug}` ),
      description: pageData.description,
      openGraph: {
        images: [pageData.header_file, ...previousImages]
      }
    }
  }
}

export default async function PagePage({ params, searchParams }) {
  const pageData = params.slug && params.slug !== 'react_devtools_backend_compact.js.map' ? await fetchPageData(params.slug) : null;
  const associatedData = await fetchAssociatedData(true, pageData?.title);

  return (
    <>
    { associatedData && pageData &&
      <OrgPageArchive
        pageData={pageData}
        associatedData={associatedData}

      />
    }
    </>
  )
}