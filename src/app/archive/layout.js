import { Suspense } from "react";

export default function ArchiveLayout({ children }) {

  return(
    <>
    <Suspense>
      { children }
    </Suspense>
    </>
  )
}