const rootURL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_PROD_API_URL : process.env.NEXT_PUBLIC_DEV_API_URL

import axios from "axios";

export const yearOptions = [
  { value: "", label: "Any" },
  { value: 1930, label: "1930s" },
  { value: 1940, label: "1940s" },
  { value: 1950, label: "1950s" },
  { value: 1960, label: "1960s" },
  { value: 1970, label: "1970s" },
  { value: 1980, label: "1980s" },
  { value: 1990, label: "1990s" },
  { value: 2000, label: "2000s" },
  { value: 2010, label: "2010s" },
  { value: 2020, label: "2020s" },
];

export const mediumOptions = [
  { value: "", label: "Any" },
  { value: "photo", label: "Photos" },
  { value: "film", label: "Film" },
  { value: "audio", label: "Audio" },
  { value: "article", label: "Articles" },
  { value: "printed material", label: "Printed Material"}
];

export async function fetchAssociatedData(callFromPage=false, pageTitle) {
  const tags = [
    "locations",
    "tags",
    "comm_groups",
    "people",
    "carousel_slides",
    "page_carousel_slides",
    "collections"
  ];
  const dataObj = {};
  for (const tagNameString of tags) {
    let url = `${rootURL}/api/v1/${tagNameString}/index`;
    if (callFromPage && tagNameString === "carousel_slides") {
      continue
    }
    if (!callFromPage && tagNameString === "page_carousel_slides") {
      continue
    }
    if (callFromPage && tagNameString === "page_carousel_slides") {
      url = `${rootURL}/api/v1/${tagNameString}/index?page_title=${encodeURIComponent(pageTitle)}`
    }
    try {
      const res = await axios.get(url);
      const data = await res.data;
      dataObj[tagNameString] = await data;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching associated data:", error);
    }
  }
  return dataObj;
}

export async function fetchPageData(slug) {
  if (slug === undefined) {
    return;
  };
  try {
    const url = `${rootURL}/api/v1/pages/${slug}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error)
    throw new Error(`Error fetching org page data with slug: ${slug}`, error);
  }
}

export async function getData(url, itemsPerLoad) {
  const res = await axios.get(rootURL + url);
  const data = await res.data;
  const hasMore = data.length > itemsPerLoad;
  const adjustedResults = hasMore ? data.splice(0, data.length - 1) : data;
  return { hasMore: hasMore, adjustedResults: adjustedResults };
}

// parameter `slug` is optional. when invoking updateArchiveItems in the Page component, simply pass slug as the final argument and the else block will run
export async function updateArchiveItems(
  currentPage,
  itemsPerLoad,
  data,
  slug = null
) {
  const offset = currentPage * itemsPerLoad;
  let url;
  // parameter strings that are identical whether updateArchiveItems called from ArchiveBeta.jsx or Page.jsx
  // parse all tags from the filters object ('data' here) into the query params
  // format for passing array values: &tags[]=Test+tag&tags[]=Another+tag
  const yearString = data.year ? `&year=${data.year}` : "";
  const mediumString = data.medium ? `&medium=${data.medium}` : "";
  const peopleString = data.people
    ? data.people
        .map((person) => `&people[]=${encodeURIComponent(person.name)}`)
        .join("")
    : "";
  const locationString = data.locations
    ? data.locations
        .map((location) => `&locations[]=${encodeURIComponent(location.name)}`)
        .join("")
    : "";
  const collectionString = data.collections
    ? data.collections
        .map(
          (collection) => `&collections[]=${encodeURIComponent(collection.name)}`
        )
        .join("")
    : "";
  const commGroupString = data.comm_groups
    ? data.comm_groups
        .map(
          (comm_group) => `&comm_groups[]=${encodeURIComponent(comm_group.name)}`
        )
        .join("")
    : "";
  const tagString = data.tags
    ? data.tags.map((tag) => `&tags[]=${encodeURIComponent(tag.name)}`).join("")
    : "";
  if (!slug) {
    // always request one more than will be shown to check if more are available
    url = `/api/v1/archive_items/index?limit=${
      itemsPerLoad + 1
    }&offset=${offset}${tagString}${locationString}${yearString}${mediumString}${commGroupString}${peopleString}${collectionString}`;
  } else {
    // parse the pageTag passed to filters from the fetchPageData function in Page.jsx
    const pageTagsArr = data.pageTag?.split(", ");
    const pageTagString = pageTagsArr
      ? pageTagsArr
          .map((tag) => `&page_tags[]=${encodeURIComponent(tag)}`)
          .join("")
      : "";

    // always request one more than will be shown to check if more are available
    // endpoint for api queries from pages is to `archive_items/pages_index`
    url = `/api/v1/archive_items/pages_index?limit=${
      itemsPerLoad + 1
    }&offset=${offset}${yearString}${mediumString}${locationString}${peopleString}${collectionString}${pageTagString}${commGroupString}${tagString}`;
  }
  try {
    return getData(url, itemsPerLoad);
  } catch (error) {
    console.log("Error updating archive items:", error);
    window.location.href = "/";
  }
}

export async function getItem(id) {
  const res = await axios.get(`${rootURL}/api/v1/archive_items/${id}`);
  const data = await res.data;
  return data;
}

export async function getLocations(locations) {
  try {
    let locationsArray = [];
    for (const location of locations) {
      const res = await axios.get(`${rootURL}/api/v1/locations/${encodeURIComponent(location.name)}`);
      let data = await res.data;
      locationsArray.push(...data);
    }

    const cleanData = locationsArray.filter((point) => {
      // ensure lat and lng values don't include incorrect characters/empty strings
      if (!point.lat || !point.lng || /[a-zA-Z,°]/.test(point.lat) || /[a-zA-Z,°]/.test(point.lng) || point.lat.trim() === "" || point.lng.trim() === "") {
        return false;
      } else {
        // convert to floats if clean
        point.lat = parseFloat(point.lat);
        point.lng = parseFloat(point.lng);

        return true;
      }
    });

    return cleanData;
  } catch(error) {
    console.log("Error fetching item locations:", error);
    return [];
  }
}

export async function getAllLocations() {
  try {
    const res = await axios.get(`${rootURL}/api/v1/locations/index`);
    const data = await res.data;

    const cleanData = data.filter((point) => {
      // ensure lat and lng values don't include incorrect characters/empty strings
      if (!point.lat || !point.lng || /[a-zA-Z,°]/.test(point.lat) || /[a-zA-Z,°]/.test(point.lng) || point.lat.trim() === "" || point.lat.trim() === "") {
        return false;
      } else {
        // convert to floats if clean
        point.lat = parseFloat(point.lat);
        point.lng = parseFloat(point.lng);

        return true;
      }
    });

    return cleanData;
  } catch(error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}

// get items for timeline. pageTag arg is optional and filters to show only dated items connected to given page
export async function fetchTimelineItems(pageTag) {
  try {
    const pageTagString = pageTag ? pageTag.map((tag) => `&page_tags[]=${tag.replace(/ /g, '+')}`).join('') : '';
    const res = await axios.get(`${rootURL}/api/v1/archive_items/timeline?${pageTagString}`);
    const data = await res.data;

    return data
  } catch(error) {
    console.error("Error fetching timeline items:", error);
    return [];
  }
}

export function sendArchiveItemFeedback(comment, title, id) {
  fetch(`${rootURL}/api/v1/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        text: comment,
        title: title,
        id: id
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
        alert(data.message)
    } else {
        alert(data.error)
    }
  })
  .catch(error => {
    console.error('Error sending archive item feedback:', error)
  });
}

// used in ArchiveBeta.jsx, Page.jsx, Carousel.jsx
// deletes all searchParams, but has no navigational effect until useNavigate called
export function clearAllFilters(params) {
  // clear all URLSearchParams except 'search'
  params.delete("comm_groups");
  params.delete("people");
  params.delete("locations");
  params.delete("tags");
  params.delete("collections");
  params.delete("year");
  params.delete("medium");
}