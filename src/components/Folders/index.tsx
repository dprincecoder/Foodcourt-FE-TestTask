import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import folderIcon from "../../assets/folder.svg";
import { useFileContext } from "../../context";
import { filetype } from "../../types";
import Loader from "../Loader";

type folderprops = {
  folders: filetype[];
};

const Folders = ({ folders }: folderprops) => {
  const { searchTerm, sortBy, loading } = useFileContext();
  const navigate = useNavigate();

  const [sortedFolders, setSortedFolders] = useState([...folders]);
  const [searchedFolders, setSearchedFolders] = useState([...folders]);

  useEffect(() => {
    const sorted = [...folders].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "timeCreated") {
        return Number(a.created_at) - Number(b.created_at);
      }
      return 0;
    });

    setSortedFolders(sorted);
  }, [folders, sortBy]);

  useEffect(() => {
    // Apply search filter based on the searchTerm
    const filtered = sortedFolders.filter((file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchedFolders(filtered);
  }, [sortedFolders, searchTerm]);

  const goToFolder = (folder: filetype) => {
    navigate(`/folder/${folder.id}`);
  };

  return (
    <div className="folders">
      <h1 className="h2-style">Folders</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex-items mt-1 flex-wrap">
          {searchedFolders.map((folder, index) => (
            <div
              className="folder-item flex-items items-center"
              key={index}
              onDoubleClick={() => goToFolder(folder)}
            >
              <div className="folder-icon mr-1">
                <img src={folderIcon} alt="folder" />
              </div>
              <div className="folder-details">
                <h3 className="folder-name h3-style">{folder.name}</h3>
                <p className="folder-size p-style">{folder.size}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Folders;
