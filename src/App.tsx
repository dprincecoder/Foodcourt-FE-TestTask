import { useState } from "react";
import cloudIcon from "./assets/cloud.svg";
import folderIcon from "./assets/folder.svg";
import ImgIcon from "./assets/img.svg";
import pdfIcon from "./assets/pdf.svg";
import printIcon from "./assets/print.svg";
import xlsIcon from "./assets/xls.svg";
import DownloadProgress from "./components/DownloadProgress";
import SearchInput from "./components/Inputs/Search";
import SortSelect from "./components/Inputs/Sort";
import FileViewer from "./components/file/FileViewer";
import { useFileContext } from "./context";
import { filetype, folderType } from "./types";

function App() {
  const { searchTerm, sortBy } = useFileContext();
  const [showmodal, setShowModal] = useState<boolean>(false);
  const [showprogress, setShowProgress] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downpecentage, setDownPercentage] = useState<number>(0);
  const [clickedFolder, setClickedFolder] = useState<folderType | null>(null);
  const [clickedFile, setClickedFile] = useState<filetype | null>(null);

  const dummyfolders: folderType[] = [
    {
      name: "Brunch Memories villa",
      size: "4.5mb",
    },
    {
      name: "Project references",
      size: "240mb",
    },
    {
      name: "Trip to Eiffel Tower, Paris",
      size: "15mb",
    },
    {
      name: "Wedding decorations",
      size: "1.5gb",
    },
  ];

  const dummyfiles: filetype[] = [
    {
      name: "Brunch with friends",
      type: "image",
      date: "Added 13th July, 2022",
      icon: ImgIcon,
      iconBgColor: "#FFF7E5",

      size: "240kb",
    },
    {
      name: "Project invoice template",
      type: "pdf",
      date: "Added 13th July, 2022",
      icon: pdfIcon,
      iconBgColor: "#FFEBEB",
      size: "15kb",
    },
    {
      name: "Pricing analysis format",
      type: "xls",
      date: "Added 13th July, 2022",
      icon: xlsIcon,
      iconBgColor: "#EBFAF3",
      size: "26mb",
    },
  ];

  const folderfunc = (file: filetype) => {
    setShowProgress(true);
    setClickedFile(file);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowProgress(false);
          }, 5000);
          return 100;
        }

        return prev + 10;
      });
      setDownPercentage((prev) => {
        if (prev >= 100) {
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
    <div className="folder-dir container">
      {showmodal && (
        <FileViewer
          name={clickedFile?.name || ""}
          handleClose={() => setShowModal(false)}
          image={clickedFile?.image || ""}
          icon={clickedFile?.icon || ""}
          date={clickedFile?.date || ""}
          iconBg={clickedFile?.iconBgColor || ""}
        />
      )}
      {showprogress && (
        <DownloadProgress
          folderName={clickedFile?.name || ""}
          progress={downloadProgress}
          percentage={downpecentage}
          size={clickedFile?.size || ""}
          icon={clickedFile?.icon || ""}
        />
      )}
      <div className="input-actions width-full mb-1 flex-items items-center justify-between">
        <SortSelect />
        <SearchInput />
      </div>
      <div className="folders">
        <h1 className="h2-style">Folders</h1>
        <div className="flex-items mt-1 flex-wrap">
          {dummyfolders.map((folder, index) => (
            <div
              className="folder-item flex-items items-center"
              key={index}
              // onDoubleClick={() => folderfunc(folder)}
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
      </div>
      <div className="files">
        <h1 className="h2-style">Files</h1>
        <div className="flex-items file mt-1 flex-wrap">
          {dummyfiles.map((file, index) => (
            <div className="file-item" key={index}>
              <div className="file">
                <div className="favorite">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M8.50079 3.20771C10.1647 1.71417 12.7359 1.76375 14.3386 3.3698C15.9413 4.97584 15.9964 7.53454 14.5058 9.20338L8.50001 15.2185L2.49439 9.20338C1.00382 7.53454 1.05954 4.9718 2.66154 3.3698C4.26536 1.76598 6.83209 1.71195 8.50079 3.20771ZM13.3359 4.37049C12.274 3.30646 10.5596 3.2633 9.44712 4.26195L8.50143 5.1108L7.55523 4.26262C6.43952 3.26256 4.72825 3.30656 3.66328 4.37153C2.60804 5.42676 2.55507 7.11684 3.52753 8.2331L8.50001 13.2135L13.4727 8.2331C14.4455 7.11641 14.3927 5.42955 13.3359 4.37049Z"
                      fill="white"
                    />
                  </svg>
                </div>
                {file.type === "image" ? (
                  <div
                    className="img-wrap"
                    // double click open the file viewer
                    onDoubleClick={() => fileFunc(file)}
                  >
                    <img
                      src="https://picsum.photos/200"
                      alt="file"
                      className="img-file"
                    />
                  </div>
                ) : (
                  <div
                    className="file-icon-type"
                    // double click open the file viewer
                    onDoubleClick={() => folderfunc(file)}
                  >
                    <img src={file.icon} alt="file" />
                    <div className="action-icons">
                      <div className="img-wrapper">
                        <img src={cloudIcon} alt="cloud" />
                      </div>
                      <div className="img-wrapper">
                        <img src={printIcon} alt="print" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="file-details flex-items items-center">
                <div
                  className="file-icon"
                  style={{ backgroundColor: file.iconBgColor }}
                >
                  <img src={file.icon} alt="file" />
                </div>
                <div>
                  <h3 className="file-name h3-style">{file.name}</h3>
                  <p className="file-date p-style">{file.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
