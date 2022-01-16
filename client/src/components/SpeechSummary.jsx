import { useState, useEffect } from "react";
import SpeechSummaryTable from "./SpeechSummaryTable";
import "../Styles/SpeechSummary.scss";

const SpeechSummary = ({ status }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setData({
        fillerWPM: 12,
        speed: 135,
        averageSentiment: 0.58,
        score: 70,
      });
    }, 1000);
  }, []);

  return (
    <div>
      <h1 className="title">Speech Summary</h1>
      <SpeechSummaryTable data={data} status={status} />
    </div>
  );
};

export default SpeechSummary;
