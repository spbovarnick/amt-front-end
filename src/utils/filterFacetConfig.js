export const filterFacets = {
  medium: {
    label: "Media",
    format: v => {
      v
      const up = v.charAt(0).toUpperCase() + v.slice(1);
      if (up === "Photo") {
        return up + "s"
      }
      return up
    },
  },
  year: {
    label: "Year",
    format: v => v + "s",
  },
  comm_groups: {
    label: "Community Groups",
    format: v => v,
  },
  people: {
    label: "People",
    format: v => v,
  },
  locations: {
    label: "Location",
    format: v => v,
  },
  tags: {
    label: "Tags",
    format: v => v,
  },
  collections: {
    label: "Collections",
    format: v => v,
  },
}