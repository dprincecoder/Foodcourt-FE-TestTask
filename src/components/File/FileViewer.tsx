import { BsCardImage } from "react-icons/bs";
import cloudIcon from "../../assets/cloud.svg";
import "./viewer.css";
type viewerProps = {
  handleClose: () => void;
  image: string;
  name: string;
  date: string;
  iconBg: string;
};

const FileViewer = ({
  date,
  handleClose,
  image,
  name,
  iconBg,
}: viewerProps) => {
  return (
    <div className="fileViewer" onClick={handleClose}>
      <div className="fileViewer-modal">
        <div className="view-header">
          <div className="dnld-icon">
            <img src={cloudIcon} alt="icon" />
          </div>
          <div className="close p-style" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8.00047 7.05767L11.3003 3.75781L12.2431 4.70062L8.94327 8.00047L12.2431 11.3003L11.3003 12.2431L8.00047 8.94327L4.70062 12.2431L3.75781 11.3003L7.05767 8.00047L3.75781 4.70062L4.70062 3.75781L8.00047 7.05767Z"
                fill="#53575A"
              />
            </svg>{" "}
            Close
          </div>
        </div>
        <div className="file">
          {" "}
          <div className="favorite">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M8.5007 3.20771C10.1646 1.71417 12.7358 1.76375 14.3385 3.3698C15.9412 4.97584 15.9963 7.53454 14.5057 9.20338L8.49992 15.2185L2.4943 9.20338C1.00373 7.53454 1.05945 4.9718 2.66145 3.3698C4.26527 1.76598 6.832 1.71195 8.5007 3.20771Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="file-image">
            <img src={image} alt="file" />
          </div>
          <div className="file-details mt-1 flex-items items-center">
            <div className="file-icon" style={{ backgroundColor: "#EBFFEC" }}>
              <BsCardImage />
            </div>
            <div>
              <h3 className="file-name h3-style">{name}</h3>
              <p className="file-date p-style">{date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileViewer;
