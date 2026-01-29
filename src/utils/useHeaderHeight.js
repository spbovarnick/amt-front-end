'use client';

import { useEffect, useState } from "react";

const useHeaderHeight = () => {

  const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
      const headerEl = document.querySelector("header");
      const updateHeight = () => setHeaderHeight(headerEl?.offsetHeight || 0);

      updateHeight();
      window.addEventListener("resize", updateHeight);

      return () => window.removeEventListener("resize", updateHeight);
    })

    return headerHeight;
}

export default useHeaderHeight;