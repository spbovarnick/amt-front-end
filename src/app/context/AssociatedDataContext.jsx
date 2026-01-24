"use client";

import { createContext, useContext } from "react";

const AssociatedDataContext = createContext(null)

export const AssociatedDataProvider = ({ value,children }) => {

  return(
    <AssociatedDataContext value={value}>
      {children}
    </AssociatedDataContext>
  )
}

export const useAssociatedData = () => {
  const context = useContext(AssociatedDataContext)

  if (!context) {
    throw new Error("useAssociatedData must be used within AssociatedDataProvider");
  }
  return context;
}