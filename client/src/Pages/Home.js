import axios from "axios";
import useInterval from "../util/utils";
import { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import InDepthContainer from "../components/InDepthContainer";
import SpeechSummary from "../components/SpeechSummary";
import "../Styles/HomePage.scss";

const baseURL = "http://127.0.0.1:5000";
const upload = "/upload";
const transcript = "/transcript";

const Home = () => {
  const [file, setFile] = useState({});

  const handleFileLoad = (e) => {
    setFile(e.target.files[0]);
  };

  // status can be either 'loading', 'not-started', 'done'
  const [status, setStatus] = useState("not-started");
  const [fileId, setFileId] = useState(null);
  const [speechId, setSpeechId] = useState(null);

  const pollForAnalysisComplete = async () => {
    const response = await axios.get(baseURL + transcript + `?id=${fileId}`);
    const responseStatus = response.data;
    return responseStatus;
  };

  const handleFileUpload = async () => {
    // upload the file
    const formData = new FormData();
    formData.append("music_file", file);
    try {
      const response = await axios.post(baseURL + upload, formData, {});
      // store the document id for API polling
      setFileId(response.data.id);
      setStatus("Loading");
      console.log(fileId);
    } catch (err) {
      console.log(err);
      return "ERROR";
    }
  };
  // let responseStatus = await pollForAnalysisComplete();

  // while (responseStatus.status === "processing") {
  //   useInterval(async () => {
  //     responseStatus = await pollForAnalysisComplete();
  //   }, 3000);
  // }

  // if (responseStatus.status === "completed") {
  //   setSpeechId(responseStatus.speechId);
  // }
  // console.log(speechId);

  return (
    <div className="pageContainer">
      <div className="left">
        <div className="upload">
          <FileUpload
            handleFileLoad={handleFileLoad}
            handleFileUpload={handleFileUpload}
          />
        </div>
        <div className="speechSummary">
          <SpeechSummary status={status} />
        </div>
      </div>
      <div className="right">
        <InDepthContainer status={status} />
      </div>
    </div>
  );
};

export default Home;
