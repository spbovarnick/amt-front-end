'use client';

import { useAssociatedData } from "../context/AssociatedDataContext";

const DesktopFiltering = ({ }) => {
  const {
    collections,
    comm_groups,
    locations,
    people,
    tags
  } = useAssociatedData();

  return (
    <>
    </>
  );
};

export default DesktopFiltering;