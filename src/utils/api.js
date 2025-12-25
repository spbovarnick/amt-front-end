'use server'

const rootURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL

import axios from "axios";

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

export async function getData(url, itemsPerLoad, ) {
  const res = await axios.get(rootURL + url);
  const data = await res.data;
  const hasMore = data.length > itemsPerLoad;
  const pages = Math.ceil(data.length / itemsPerLoad)
  const adjustedResults = hasMore ? data.splice(0, data.length - 1) : data;
  return { pages: pages, adjustedResults: adjustedResults, hasMore: hasMore };
}

export async function getPageCount({
  filterData,
  itemsPerLoad,
  isSearching = false,
  searchTerm,
  search,
}) {
  let url;
  let endpoint = isSearching ? 'search_page_count' : 'page_count';
  let searchString = "";
  if (isSearching) {
    searchString = `&q=${encodeURIComponent(searchTerm ? searchTerm : search)}`;
  };
  // parameter strings that are identical whether updateArchiveItems called from ArchiveBeta.jsx or Page.jsx
  // parse all tags from the filters object ('filterData' here) into the query params
  // format for passing array values: &tags[]=Test+tag&tags[]=Another+tag
  const yearString = filterData.year ? `&year=${filterData.year}` : "";
  const mediumString = filterData.medium ? `&medium=${filterData.medium}` : "";
  const peopleString = filterData.people
    ? filterData.people
      .map((person) => `&people[]=${encodeURIComponent(person.name)}`)
      .join("")
    : "";
  const locationString = filterData.locations
    ? filterData.locations
      .map((location) => `&locations[]=${encodeURIComponent(location.name)}`)
      .join("")
    : "";
  const collectionString = filterData.collections
    ? filterData.collections
      .map(
        (collection) => `&collections[]=${encodeURIComponent(collection.name)}`
      )
      .join("")
    : "";
  const commGroupString = filterData.comm_groups
    ? filterData.comm_groups
      .map(
        (comm_group) => `&comm_groups[]=${encodeURIComponent(comm_group.name)}`
      )
      .join("")
    : "";
  const tagString = filterData.tags
    ? filterData.tags.map((tag) => `&tags[]=${encodeURIComponent(tag.name)}`).join("")
    : "";
  // if (!slug) {
  //   // always request one more than will be shown to check if more are available
  //   url = `/api/v1/archive_items/${endpoint}?${tagString}${locationString}${yearString}${mediumString}${commGroupString}${peopleString}${collectionString}`;
  // } else {
    // parse the pageTag passed to filters from the fetchPageData function in Page.jsx
    const pageTagsArr = filterData.pageTag?.split(", ");
    const pageTagString = pageTagsArr
      ? pageTagsArr
        .map((tag) => `&page_tags[]=${encodeURIComponent(tag)}`)
        .join("")
      : "";

    // always request one more than will be shown to check if more are available
    // endpoint for api queries from pages is to `archive_items/pages_index`
    url = `/api/v1/archive_items/${endpoint}?${searchString}${yearString}${mediumString}${locationString}${peopleString}${collectionString}${pageTagString}${commGroupString}${tagString}`;
  // }
  try {
    const res = await axios.get(rootURL + url)
    const count = await res.data
    return Math.ceil(count/itemsPerLoad)
  } catch (error) {
    console.log("Error getting total page count:", error);
    window.location.href = "/";
  }
}


// parameter `slug` is optional. when invoking updateArchiveItems in the Page component, simply pass slug as the final argument and the else block will run
export async function updateArchiveItems(
  currentPage,
  itemsPerLoad,
  data,
  slug = null
) {
  const offset = currentPage < 1 ? currentPage * itemsPerLoad : (currentPage - 1) * itemsPerLoad;
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

export async function sendArchiveItemFeedback(title, id, uid, firstName, lastName, emailAddy, subject, comment) {
  try {
    const respone = await fetch(`${rootURL}/api/v1/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        id: id,
        uid: uid,
        first_name: firstName,
        last_name: lastName,
        email_addy: emailAddy,
        subject: subject,
        comment: comment,
      })
    });

    return await respone.json();
  } catch (error) {
    return { status: "error", error: error.message}
  }
}