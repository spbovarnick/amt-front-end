"use client";

import searchIcon from "@/../public/images/magnifying_glass.png";
import Image from "next/image";
import xIcon from "@/../public/images/x.svg"
import { startTransition, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Search = ({ onHero }) => {
  const { push } = useRouter();
  const sP = useSearchParams();
  const activeSearchTerm = sP.get("search")
  const params = new URLSearchParams(sP);

  const [searchTerm, setSearchTerm] = useState(activeSearchTerm || "");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm || searchTerm.length < 1) return;
    params.set("search", searchTerm);

    push(`/?${params.toString()}`);
  }

  const clearTerm = (e) => {
    e.preventDefault();
    setSearchTerm("")
    if (activeSearchTerm) {
      params.delete("search")
      const newParams = params.toString();
      startTransition(() => {
        push(`/?${newParams}`, { scroll: false });
      });
    }
  }


  return (
    <form
      className={`search ${onHero ? "on-hero" : ""}`}
      onSubmit={e => handleSearch(e)}
    >
      <input
        placeholder="SEARCH THE ARCHIVE"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      { searchTerm?.length > 0 &&
        <button className="clear-search">
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
            className="search-icon"
            width={30}
            height={30}
            onClick={e => handleSearch(e)}
        />
    </form>
  )
}

export default Search