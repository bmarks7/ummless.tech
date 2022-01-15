import { useState, useEffect } from "react";
import SpeechSummaryTable from "./SpeechSummaryTable";

const SpeechSummary = () => {
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
      <h1>Speech Summary</h1>
      <SpeechSummaryTable data={data} />
    </div>
  );
};

export default SpeechSummary;
