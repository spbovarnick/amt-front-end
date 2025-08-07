import Link from "next/link"

export default function PaginationNumber ({
  page,
  href,
  isActive,
  isDisabled
}) {

  return (
    <Link
      key={page}
      className={`numEl ${isActive ? "current_page" : ""} ${isDisabled ? "ellipsis" : ""}`}
      id={page}
      href={href}
      scroll={false}
    >
      {page}
    </Link>
  )
}