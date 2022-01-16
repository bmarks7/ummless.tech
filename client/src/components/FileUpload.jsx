import { useState, useRef } from "react";
import "../Styles/FileUpload.scss";

const FileUpload = () => {
  const fileInputField = useRef(null);
  const [file, setFile] = useState({});

  const handleFileLoad = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    // insert api call
    console.log(formData);
  };

  return (
    <div className="uploadContainer">
      <input
        type="file"
        title=""
        value=""
        ref={fileInputField}
        onChange={handleFileLoad}
        className="custom-file-input"
      />
      <button type="button" onClick={handleFileUpload}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
