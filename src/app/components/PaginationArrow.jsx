import Link from "next/link";
import chevronLeft from "public/images/chevron-left.svg";
import chevronRight from "public/images/chevron-right.svg";
import Image from "next/image";

export default function PaginationArrow ({ href, direction, isDisabled }){
  const file = direction === "left" ? chevronLeft.src : chevronRight.src
  const cssId = direction === "left" ? "prev_page" : "next_page"
  const cssClass = direction === "left" ? "page-back-btn" : "page-next-btn"


  return (
    <Link
      href={href}
      className={`arrow_a ${isDisabled ? "disabled-pagination" : ""}`}
    >
      <Image
        src={file}
        width={100}
        height={100}
        alt={`${direction}-pointing chevron`}
        id={cssId}
        className={`page-btn ${cssClass}`}
      />
    </Link>
  )
};