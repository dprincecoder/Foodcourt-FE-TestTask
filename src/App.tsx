import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DownloadProgress from "./components/DownloadProgress";
import Files from "./components/File";
import FileViewer from "./components/File/FileViewer";
import Folder from "./components/Folder";
import Folders from "./components/Folders";
import SearchInput from "./components/Inputs/Search";
import SortSelect from "./components/Inputs/Sort";
import { useFileContext } from "./context";
import { filetype } from "./types";

function App() {
  const [showmodal, setShowModal] = useState<boolean>(false);
  const [clickedFile, setClickedFile] = useState<filetype | null>(null);
  const [showprogress, setShowProgress] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downpecentage, setDownPercentage] = useState<number>(0);
  const { files, folders } = useFileContext();

  const downloadfunc = (file: filetype) => {
    setShowProgress(true);
    setClickedFile(file);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowProgress(false);
            setDownloadProgress(0);
          }, 5000);
          return 100;
        }

        return prev + 10;
      });
      setDownPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownPercentage(0);
          }, 5000);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
  };

  const fileFunc = (file: filetype) => {
    setClickedFile(file);
    setShowModal(true);
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="folder-dir container">
            {showmodal && (
              <FileViewer
                name={clickedFile?.name || ""}
                handleClose={() => setShowModal(false)}
                image={clickedFile?.src || ""}
                date={clickedFile?.created_at || ""}
                iconBg={clickedFile?.iconBgColor || ""}
              />
            )}
            {showprogress && (
              <DownloadProgress
                fileName={clickedFile?.name || ""}
                progress={downloadProgress}
                percentage={downpecentage}
                size={clickedFile?.size || "10kb"}
              />
            )}
            <div className="input-actions width-full mb-1 flex-items items-center justify-between">
              <SortSelect />
              <SearchInput />
            </div>
            <Folders folders={folders} />
            <Files
              openImgPreview={fileFunc}
              downloadfile={downloadfunc}
              files={files}
            />
          </div>
        }
      />
      <Route
        path="/folder/:id"
        element={
          <Folder openImgPreview={fileFunc} downloadfile={downloadfunc} />
        }
      />
    </Routes>
  );
}

export default App;
