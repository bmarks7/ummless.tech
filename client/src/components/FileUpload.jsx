import "../Styles/FileUpload.scss";

const FileUpload = ({ handleFileLoad, handleFileUpload }) => {
  return (
    <div className="uploadContainer">
      <input
        type="file"
        title=""
        value=""
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
