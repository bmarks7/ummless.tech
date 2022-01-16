import axios from "axios";
import { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import InDepthContainer from "../components/InDepthContainer";
import SpeechSummary from "../components/SpeechSummary";
import "../Styles/HomePage.scss";

const baseURL = "http://127.0.0.1:5000";
const upload = "/upload";
const transcript = "/transcript";
const summary = "/summary";
const inDepth = "/in_depth_analysis";

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

  useEffect(() => {
    if (status === "not-started" || status === "done") {
      return;
    }

    const pollingInterval = setInterval(async () => {
      const responseStatus = await pollForAnalysisComplete();
      if (responseStatus.status === "completed") {
        setStatus("done");
        setSpeechId(responseStatus.speechId);
      }
      console.log(responseStatus);
    }, 3000);
    return () => clearInterval(pollingInterval);
  }, [status]);

  const [summaryData, setSummaryData] = useState(null);
  useEffect(() => {
    const getSpeechSummary = async () => {
      try {
        const response = await axios.get(
          baseURL + summary + `?speechId=${speechId}`
        );
        setSummaryData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (status === "done" && speechId !== null) {
      getSpeechSummary();
    }
  }, [speechId, status]);

  const [inDepthData, setInDepthData] = useState(null);
  useEffect(() => {
    const getSpeechDetails = async () => {
      try {
        const response = await axios.get(
          baseURL + inDepth + `?speechId=${speechId}`
        );
        setInDepthData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (status === "done" && speechId !== null) {
      getSpeechDetails();
    }
  }, [speechId, status]);

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
          <SpeechSummary data={summaryData} status={status} />
        </div>
      </div>
      <div className="right">
        <InDepthContainer speechData={inDepthData} status={status} />
      </div>
    </div>
  );
};

export default Home;
