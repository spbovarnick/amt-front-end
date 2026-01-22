'use client';

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const useFilters = ({
  yearOptions = [],
  mediumOptions = [],
  locations = [],
  tags = [],
  commGroups = [],
  people = [],
  collections = [],
}) => {
  const sp = useSearchParams();

  const getAll = useCallback((key) => {return sp?.getAll(key) || []},[sp]);

  const filterYear = useMemo(() => {
    if (!yearOptions.length) return [];
    const years = getAll('year').map(String);
    return yearOptions.filter(o => years.includes(String(o.value)));
  }, [getAll, yearOptions]);

  const filterMedium = useMemo(() => {
    if (!mediumOptions.length) return [];
    const media = getAll('medium');
    return mediumOptions.filter(o => media.includes(o.value));
  }, [getAll, mediumOptions]);

  const filterLocations = useMemo(() => {
    const vals = getAll('locations');
    return locations.filter(l => vals.includes(l.name));
  }, [getAll, locations]);

  const filterTags = useMemo(() => {
    const vals = getAll('tags');
    return tags.filter(t => vals.includes(t.name));
  }, [getAll, tags]);

  const filterCommGroups = useMemo(() => {
    const vals = getAll('comm_groups');
    return commGroups.filter(c => vals.includes(c.name));
  }, [getAll, commGroups]);

  const filterPeople = useMemo(() => {
    const vals = getAll('people');
    return people.filter(p => vals.includes(p.name));
  }, [getAll, people]);

  const filterCollections = useMemo(() => {
    const vals = getAll('collections');
    return collections.filter(c => vals.includes(c.name));
  }, [getAll, collections]);

  const filters = useMemo(() => ({
    year: filterYear.map(y => y.value),
    medium: filterMedium.map(m => m.value),
    locations: filterLocations,
    tags: filterTags,
    comm_groups: filterCommGroups,
    people: filterPeople,
    collections: filterCollections,
  }), [
    filterYear,
    filterMedium,
    filterLocations,
    filterTags,
    filterCommGroups,
    filterPeople,
    filterCollections,
  ]);

  // pass filterKey to useArchiveQuery as stable ref to prevent render loop
  const filterKey = useMemo(() => {
    return JSON.stringify({
      year: [...filterYear.map(y => y.value)].sort(),
      medium: [...filterMedium.map(m => m.value)].sort(),
      locations: [...filterLocations.map(l => l.name)].sort(),
      tags: [...filterTags.map(t => t.name)].sort(),
      comm_groups: [...filterCommGroups.map(c => c.name)].sort(),
      people: [...filterPeople.map(p => p.name)].sort(),
      collections: [...filterCollections.map(c => c.name)].sort(),
    });
  },[
    filterYear,
    filterMedium,
    filterLocations,
    filterTags,
    filterCommGroups,
    filterPeople,
    filterCollections,
  ])

  const isFiltering = useMemo(
    () => Object.values(filters).some(v => Array.isArray(v) && v.length > 0),
    [filters]
  );

  return {
    filters,
    filterKey,
    isFiltering,
    filterYear,
    filterMedium,
    filterLocations,
    filterTags,
    filterCommGroups,
    filterPeople,
    filterCollections,
  };
}

export default useFilters