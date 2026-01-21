'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { updateArchiveItems, getData, getPageCount } from '@/utils/api';
import { createSearchUrl, yearOptions, mediumOptions } from '@/utils/actions';
import ArchiveGallery from '@/app/components/ArchiveGallery';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import filterIcon from "@/../public/images/filter.svg";
import MobileFiltering from './MobileFiltering';
import useFilters from '@/utils/useFilters';

export default function AlbinaCommArchive({ associatedData }) {
  const itemsPerLoad = 20;
  const focusedRef = useRef(null);
  const archiveGalleryEl = useRef(null);
  const advancedSearchOpenRef = useRef(null);
  const exitAdvancedSearchOpenRef = useRef(null);
  const sP = useSearchParams();
  const searchParams = new URLSearchParams(sP);

  const locations = associatedData.locations;
  const tags = associatedData.tags;
  const commGroups = associatedData.comm_groups;
  const people = associatedData.people;
  const collections = associatedData.collections;

  const search = sP.get("search");

  const [archiveResults, setArchiveResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPagination, setShowPagination] = useState(false);
  const [pages, setPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  // const [isFiltering, setIsFiltering] = useState(0);
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const currentPage = searchParams.get("page");
  const [isPending, startTransition] = useTransition();

  const { filters, isFiltering } = useFilters({
    yearOptions,
    mediumOptions,
    locations,
    tags,
    commGroups,
    people,
    collections,
  })

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

  useEffect(() => {
    // this effect hook only re-hydrates archiveResults from index endpoint
    // when currentPage changes and filters has updated
    (async () => {
      if (isFiltering && !isSearching) {
        // this block only refreshes archiveResults with fresh data when user only toggling filters
        setIsLoaded(false);
        const data = await updateArchiveItems(currentPage, itemsPerLoad, filters)
        const paginationData = await getPageCount({ filterData: filters, itemsPerLoad: itemsPerLoad, })
        paginationData && setPages(paginationData)
        paginationData && setShowPagination(paginationData > 1 || currentPage > 1);
        data && setArchiveResults(data.adjustedResults);
        data && setIsLoaded(true)
      } else if (isSearching) {
        // this block refreshes archiveResults when users have searched and are filtering search results with advanced filter options
        setIsLoaded(false);
        const args = createSearchUrl({
          searchTerm: searchTerm,
          search: search,
          filters: filters,
          currentPage: currentPage,
          itemsPerLoad: itemsPerLoad
        });
        const data = await getData(args.url, args.itemsPerLoad);
        const paginationData = await getPageCount({
          filterData: filters,
          itemsPerLoad: args.itemsPerLoad,
          isSearching: true,
          search,
          searchTerm
        });
        paginationData && setPages(paginationData);
        paginationData && setShowPagination(paginationData > 1);
        data && setArchiveResults(data.adjustedResults);
        data && setIsLoaded(true)
      }
    })();
  }, [filters, isSearching]);

  useEffect(() => {
    // if 'search' URL param present, set isSearching to true and searchTerm to 'search' URL param string
    if (search) {
      setIsSearching(true)
      setSearchTerm(search)
    } else {
      setIsSearching(false)
    }
  }, [search]);

  return (
    <div className="page-wrapper --is-dark">
      <section className="archive-wrapper">
        <div className="archive-content ">
          <MobileFiltering
            advancedSearchOpen={advancedSearchOpen}
            setAdvancedSearchOpen={setAdvancedSearchOpen}
            commGroups={commGroups}
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