'use client';

import { useEffect, useState, useRef } from "react";
import { updateArchiveItems, getData, getPageCount } from "./api";
import { createSearchUrl } from "./actions";

const useArchiveQuery = ({
  filters,
  search,
  searchTerm,
  currentPage,
  itemsPerLoad,
}) => {
  const [archiveResults, setArchiveResults] = useState([]);
  const [pages, setPages] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const requestId = useRef(0);

  useEffect(() => {
    let isActive = true;
    const id = ++requestId.current;

    async function run() {
      setIsLoaded(false);

      if (search) {
        const args = createSearchUrl({
          searchTerm,
          search,
          filters,
          currentPage,
          itemsPerLoad,
        });

        const [data, count] = await Promise.all([
          getData(args.url, args.itemsPerLoad),
          getPageCount({
            filterData: filters,
            itemsPerLoad: args.itemsPerLoad,
            isSearching: true,
            search,
            searchTerm,
          }),
        ]);

        if (!isActive || requestId.current !== id) return;

        setArchiveResults(data?.adjustedResults || []);
        setPages(count || 0);
        setShowPagination(count > 1);
        setIsLoaded(true);
        return;
      }

      const [data, count] = await Promise.all([
        updateArchiveItems(currentPage, itemsPerLoad, filters),
        getPageCount({ filterData: filters, itemsPerLoad }),
      ]);

      if (!isActive || requestId.current !== id) return;

      setArchiveResults(data?.adjustedResults || []);
      setPages(count || 0);
      setShowPagination(count > 1 || currentPage > 1);
      setIsLoaded(true);
    }

    run();

    return () => {
      isActive = false;
    };
  }, [
    filters,
    search,
    searchTerm,
    currentPage,
    itemsPerLoad,
  ]);

  return {
    archiveResults,
    pages,
    showPagination,
    isLoaded,
  };
}