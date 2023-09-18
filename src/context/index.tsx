/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { filetype } from "../types";

// Define a TypeScript interface for the context
interface FileContextProps {
  sortBy: string;
  searchTerm: string;
  updateSortBy: (value: string) => void;
  updateSearchTerm: (value: string) => void;
  files: filetype[];
  folders: filetype[];
  loading: boolean;
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
  const [files, setFiles] = useState<filetype[]>([]);
  const [folders, setFolders] = useState<filetype[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to update the sorting option
  const updateSortBy = (value: string) => {
    setSortBy(value);
  };

  // Function to update the search term
  const updateSearchTerm = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    fetch("https://fc-test.onrender.com/", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFiles(data.filter((file: filetype) => file.type === "file"));
        setFolders(data.filter((file: filetype) => file.type === "folder"));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const contextValue: FileContextProps = {
    sortBy,
    searchTerm,
    updateSortBy,
    updateSearchTerm,
    files,
    folders,
    loading,
  };

  return (
    <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>
  );
};
