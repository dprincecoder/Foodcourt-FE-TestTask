type progressProps = {
  folderName: string;
  progress: number;
  percentage: number;
  size: string;
  icon: string;
};

const DownloadProgress = ({
  folderName,
  percentage,
  progress,
  icon,
  size,
}: progressProps) => {
  return (
    <div
      className="download-progress"
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 100,
        backgroundColor: "#fff",
      }}
    >
      <div className="folder-item flex-items items-center">
        {progress >= 100 ? (
          <div
            className="folder-icon mr-1"
            style={{
              background: `#EBFFEC`,
            }}
          >
            <svg
              width="20"
              height="18"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.1951 3.22555C10.3735 3.41294 10.3662 3.70947 10.1788 3.88786L4.7654 9.04101C4.67296 9.12901 4.54861 9.17549 4.4211 9.16968C4.2936 9.16388 4.17399 9.10631 4.08992 9.01027L2.00784 6.63189C1.83742 6.43722 1.85708 6.14126 2.05175 5.97084C2.24642 5.80042 2.54239 5.82008 2.71281 6.01475L4.47317 8.02563L9.53282 3.20923C9.72021 3.03085 10.0167 3.03815 10.1951 3.22555Z"
                fill="#FB8500"
              />
            </svg>
          </div>
        ) : (
          <div
            className="folder-icon mr-1"
            style={{
              background: `conic-gradient(#32BD7A ${progress}%, #F2F2F2 0%)`,
            }}
          >
            <img src={icon} alt="folder" />
          </div>
        )}
        <div className="folder-details">
          <h3 className="folder-name h3-style">{folderName}</h3>
          <p className="folder-size p-style">
            {size}{" "}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="7"
                viewBox="0 0 6 7"
                fill="none"
              >
                <circle cx="3" cy="3.5" r="3" fill="#B6B8BA" />
              </svg>
            </span>{" "}
            {percentage}% done
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadProgress;
