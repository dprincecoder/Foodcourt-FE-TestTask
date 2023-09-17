/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

// Define a TypeScript interface for the context
interface FileContextProps {
  sortBy: string;
  searchTerm: string;
  updateSortBy: (value: string) => void;
  updateSearchTerm: (value: string) => void;
}

// Create a new context
const FileContext = createContext<FileContextProps | undefined>(undefined);

// Create a custom hook to use the context
export function useFileContext() {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
}
interface FileProviderProps {
  children: React.ReactNode; // This allows any valid React children to be passed
}
// Create the FileProvider component
export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [sortBy, setSortBy] = useState("name"); // Initial sorting option
  const [searchTerm, setSearchTerm] = useState("");

  // Function to update the sorting option
  const updateSortBy = (value: string) => {
    setSortBy(value);
  };

  // Function to update the search term
  const updateSearchTerm = (value: string) => {
    setSearchTerm(value);
  };

  const contextValue: FileContextProps = {
    sortBy,
    searchTerm,
    updateSortBy,
    updateSearchTerm,
  };

  return (
    <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>
  );
};
