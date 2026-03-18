export const dynamic = 'force-dynamic';

import { Suspense } from "react";

const CollectionsLayout = ({ children }) => {

  return (
    <>
    <Suspense fallback={null}>
      {children}
    </Suspense>
    </>
  )
}

export default CollectionsLayout;