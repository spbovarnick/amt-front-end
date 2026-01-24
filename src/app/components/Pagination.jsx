'use client'

import { useSearchParams, usePathname } from "next/navigation"
import { useState, useEffect } from "react";
import PaginationArrow from "./PaginationArrow"
import { generatePagination } from "@/utils/actions";
import PaginationNumber from "./PaginationNumber";

export default function Pagination ({ totalPages }) {
  // const totalPages = 50
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [innerWidth, setInnerWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth)
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const pages = generatePagination({currentPage: currentPage, totalPages: totalPages, width: innerWidth});

  const createPageURL = ( pageNumber ) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="pagination_controls">
      <PaginationArrow
        href={createPageURL(currentPage - 1)}
        direction="left"
        isDisabled={currentPage <= 1}
      />
      <div className="page_nums">
        {pages.map((page, index) => {

          return (
            <PaginationNumber
              key={page+index}
              page={page}
              href={createPageURL(page)}
              isActive={currentPage === page}
              isDisabled={page === "..."}
            />
          )
        })}
      </div>
      <PaginationArrow
        href={createPageURL(currentPage + 1)}
        direction="right"
        isDisabled={currentPage >= totalPages}
      />
    </div>
  )
}