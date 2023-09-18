export const getFileType = (fileName: string): string => {
  const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "tiff"];

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
  ];

  // Check if the file extension belongs to the image or document category
  if (imageExtensions.includes(fileExtension)) {
    return "image";
  } else if (documentExtensions.includes(fileExtension)) {
    return "document";
  } else {
    return "other";
  }
};

export const getDocumentIcon = (fileName: string): string => {
  const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";

  // Define mappings of file extensions to icon names or CSS class names
  const iconMappings: { [key: string]: string } = {
    pdf: "pdf-icon",
    xlsx: "xlsx-icon",
    docx: "docx-icon",
  };

  // Check if the file extension is in the iconMappings, and return the corresponding icon
  if (fileExtension in iconMappings) {
    return iconMappings[fileExtension];
  } else {
    return "default-icon";
  }
};

export function formatDate(dateStr: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Extract the day, month, and year from the formatted date
  const [, month, day, year] = formattedDate.match(/(\w+) (\d+), (\d+)/) || [];

  // Function to add ordinal suffix to the day
  const addOrdinalSuffix = (day: string): string => {
    const lastDigit = day.charAt(day.length - 1);
    switch (lastDigit) {
      case "1":
        return `${day}st`;
      case "2":
        return `${day}nd`;
      case "3":
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const formattedDay = addOrdinalSuffix(day);

  return `Added ${formattedDay} ${month}, ${year}`;
}
