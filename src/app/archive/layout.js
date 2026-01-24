import { Suspense } from "react";

export default function ArchiveLayout({ children }) {

  return(
    <>
    <Suspense fallback={null}>
      { children }
    </Suspense>
    </>
  )
}