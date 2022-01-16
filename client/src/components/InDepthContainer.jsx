import { useState } from "react";
import InDepthCard from "./InDepthCard";
import { data } from "../data";
import "../Styles/InDepthSummary.scss";

const InDepthContainer = () => {
  const [speechData, setSpeechData] = useState(null);

  const fetchData = () => {
    const analysisResults = data.sentiment_analysis_results;
    setSpeechData(analysisResults);
  };

  return (
    <div className="inDepthContainer">
      <h2 onClick={fetchData} className="inDepthTitle">
        In-Depth Speech Analysis
      </h2>
      <div className="headingContainer">
        <h3 className="sentimentHeading">Sentiment</h3>
        <h3>Speech Section</h3>
      </div>
      {speechData &&
        speechData.map((chunk, index) => {
          const elapsedTime = (
            (chunk["end"] - chunk["start"]) /
            1000 /
            60
          ).toFixed(2);
          const speed = (chunk["text"].split(" ").length / elapsedTime).toFixed(
            2
          );
          let sentiment;
          switch (chunk["sentiment"]) {
            case "NEUTRAL":
              sentiment = "=";
              break;
            case "NEGATIVE":
              sentiment = "-";
              break;
            case "POSITIVE":
              sentiment = "+";
              break;
            default:
              sentiment = "=";
              break;
          }
          const text = chunk["text"];
          return (
            <InDepthCard
              key={index}
              speed={speed}
              elapsedTime={elapsedTime}
              sentiment={sentiment}
              text={text}
            />
          );
        })}
    </div>
  );
};

export default InDepthContainer;
