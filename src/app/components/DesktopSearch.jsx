"use client";

import searchIcon from "@/../public/images/search-icon.svg";
import Image from "next/image";
import xIcon from "@/../public/images/x.svg"
import { useState } from "react";
import { useRouter } from "next/navigation";

const DesktopSearch = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { push } = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm || searchTerm.length < 1) return;
    const params = new URLSearchParams();
    params.set("search", searchTerm);

    push(`/archive?${params.toString()}`);
  }

  const clearTerm = (e) => {
    e.preventDefault();
    setSearchTerm("")
  }

  return (
    <form
      className="desktop-search"
      onSubmit={e => handleSearch(e)}
    >
      <input
        placeholder="Search the archive"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      { searchTerm?.length > 0 &&
        <button className="desktop-clear-search">
          <Image
            src={xIcon.src}
            width={20}
            height={20}
            alt="X icon to clear search terms"
            onClick={e => clearTerm(e)}
          />
        </button>}
        <Image
            src={searchIcon.src}
            alt="Magnifying glass icon for search"
            className="desktop-search-icon"
            width={30}
            height={30}
            onClick={e => handleSearch(e)}
        />
    </form>
  )
}

export default DesktopSearch