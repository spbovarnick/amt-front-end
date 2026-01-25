'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { yearOptions, mediumOptions } from '@/utils/actions';
import ArchiveGallery from '@/app/components/ArchiveGallery';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import filterIcon from "@/../public/images/filter.svg";
import MobileFiltering from './MobileFiltering';
import useFilters from '@/utils/useFilters';
import AppliedFilters from './AppliedFilters';
import useArchiveQuery from '@/utils/useArchiveQuery';
import { useAssociatedData } from '../context/AssociatedDataContext';

export default function AlbinaCommArchive({ }) {
  const {
    collections,
    comm_groups,
    locations,
    people,
    tags
  } = useAssociatedData();

  const itemsPerLoad = 20;
  const focusedRef = useRef(null);
  const archiveGalleryEl = useRef(null);
  const advancedSearchOpenRef = useRef(null);
  const exitAdvancedSearchOpenRef = useRef(null);
  const sP = useSearchParams();
  const searchParams = new URLSearchParams(sP);

  const search = sP.get("search") || "";
  const searchTerm = search;
  const isSearching = Boolean(search);

  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [isPending, startTransition] = useTransition();

  const currentPage = Number(searchParams.get("page")) || 1;

  const { filters, isFiltering, filterKey } = useFilters({
    yearOptions,
    mediumOptions,
    locations,
    tags,
    comm_groups,
    people,
    collections,
  });

  const {
    archiveResults,
    pages,
    showPagination,
    isLoaded,
  } = useArchiveQuery({
    filters,
    search,
    searchTerm,
    currentPage,
    itemsPerLoad,
    filterKey
  });

  useEffect(() => {
    const clickListener = (e) => {
      if (advancedSearchOpenRef.current && !advancedSearchOpenRef.current?.contains(e.target)) {
          setAdvancedSearchOpen(!advancedSearchOpen)
      }
    }

    document.addEventListener("click", clickListener)

    return () => {
      document.removeEventListener("click", clickListener)
    }
  }, [advancedSearchOpen])

  return (
    <div className="page-wrapper">
      <section className="archive-wrapper">
        <div className="archive-content ">
          <MobileFiltering
            advancedSearchOpen={advancedSearchOpen}
            setAdvancedSearchOpen={setAdvancedSearchOpen}
            comm_groups={comm_groups}
            people={people}
            locations={locations}
            tags={tags}
            collections={collections}
            mediumSearchParams={searchParams.getAll("medium")}
            yearSearchParams={searchParams.getAll("year")}
            commGroupsSearchParams={searchParams.getAll("comm_groups")}
            peopleSearchParams={searchParams.getAll("people")}
            locationsSearchParams={searchParams.getAll("locations")}
            tagsSearchParams={searchParams.getAll("tags")}
            collectionsSearchParams={searchParams.getAll("collections")}
            advancedSearchOpenRef={advancedSearchOpenRef}
            exitAdvancedSearchOpenRef={exitAdvancedSearchOpenRef}
          />
          <button
            onClick={() => {
              setAdvancedSearchOpen(!advancedSearchOpen)
            }}
            className={`advanced-search__toggle-mobile ${advancedSearchOpen ? "" : ""}`}
          >
            <Image
              src={filterIcon}
              width={20}
              height={20}
              alt='Filter icon'
              className='mobile-filter-icon'
            />
            Show advanced search options
          </button>
          <AppliedFilters />
          {searchTerm && archiveResults.length > 0 &&
            <div className='search-results-for'>Search results for "{searchTerm}"</div>
          }
          <div id="archive-gallery" ref={archiveGalleryEl} className={`${advancedSearchOpen ? "advanced-search-open" : ""}`}>
            <ArchiveGallery
              isLoaded={isLoaded}
              isFiltering={isFiltering}
              isSearching={isSearching}
              archiveResults={archiveResults}
              showPagination={showPagination}
              pages={pages}
              searchTerm={searchTerm}
              isFocused={isFocused}
              setIsFocused={setIsFocused}
              focusedRef={focusedRef}
              isPending={isPending}
            />
          </div>
        </div>
      </section>
    </div>
  )
}