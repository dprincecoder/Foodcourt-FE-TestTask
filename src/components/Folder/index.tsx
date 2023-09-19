import { useEffect } from "react";
import { AiFillFile } from "react-icons/ai";
import { CiHome } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import cloudIcon from "../../assets/cloud.svg";
import imgIcon from "../../assets/img.svg";
import pdfIcon from "../../assets/pdf.svg";
import printIcon from "../../assets/print.svg";
import xlsxIcon from "../../assets/xls.svg";
import { useFileContext } from "../../context";
import { formatDate, getDocumentIcon, getFileType } from "../../helpers";
import { filetype } from "../../types";

type folderprops = {
  downloadfile: (file: filetype) => void;
  openImgPreview: (file: filetype) => void;
};

const Folder = ({ downloadfile, openImgPreview }: folderprops) => {
  const { id } = useParams<{ id: string }>();
  const { folders } = useFileContext();

  const folder = folders.find((folder) => folder.id === id);

  useEffect(() => {
    if (!folder) {
      window.location.href = "/";
    }
  }, [folder]);

  return (
    <div className="container">
      <div className="navigation-btn">
        <Link to="/">
          <CiHome /> Home
        </Link>{" "}
        <span>{"/"}</span> Folders <span>{"/"}</span> {folder?.name}
      </div>

      <h1 className="mt-1">{folder?.name}</h1>

      {folder?.contents.length === 0 ? (
        <div
          className="empty"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            width: "100%",
          }}
        >
          <h3 className="mt-1">Nothing to see here!</h3>
        </div>
      ) : (
        <div className="flex-items file mt-1 flex-wrap">
          {folder?.contents.map((file, index) => (
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
                {getFileType(file.name) === "image" ? (
                  <div
                    className="img-wrap"
                    onDoubleClick={() => openImgPreview(file)}
                  >
                    <img src={file.src} alt="image-file" className="img-file" />
                  </div>
                ) : (
                  <div
                    className="file-icon-type"
                    onDoubleClick={() => {
                      downloadfile(file);

                      // const link = document.createElement("a");
                      // link.href = file.src;
                      // link.download = file.name;
                      // document.body.appendChild(link);
                      // link.click();
                      // document.body.removeChild(link);
                    }}
                  >
                    {getDocumentIcon(file.name) === "pdf-icon" ? (
                      <img src={pdfIcon} alt="file" />
                    ) : getDocumentIcon(file.name) === "xlsx-icon" ? (
                      <img src={xlsxIcon} alt="file" />
                    ) : (
                      <AiFillFile />
                    )}
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
                  style={{ backgroundColor: "#EBFFEC" }}
                >
                  {getDocumentIcon(file.name) === "pdf-icon" ? (
                    <img src={pdfIcon} alt="file" />
                  ) : getDocumentIcon(file.name) === "xlsx-icon" ? (
                    <img src={xlsxIcon} alt="file" />
                  ) : (
                    <img src={imgIcon} alt={file.name} />
                  )}
                </div>
                <div>
                  <h3 className="file-name h3-style">{file.name}</h3>
                  <p className="file-date p-style">
                    {formatDate(file.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
