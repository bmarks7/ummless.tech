import InDepthCard from "./InDepthCard";
import "../Styles/InDepthSummary.scss";

const InDepthContainer = ({ speechData, status }) => {
  return (
    <div className="inDepthContainer">
      <h2 className="inDepthTitle">In-Depth Speech Analysis</h2>
      <div className="headingContainer">
        <h3 className="sentimentHeading">Sentiment</h3>
        <h3>Speech Section</h3>
      </div>
      {speechData &&
        speechData.map((chunk, index) => {
          let sentiment;
          switch (chunk["sentiment"]) {
            case 0:
              sentiment = "=";
              break;
            case -1:
              sentiment = "-";
              break;
            case 1:
              sentiment = "+";
              break;
            default:
              sentiment = "=";
              break;
          }
          const text = chunk["textChunk"];
          return (
            <InDepthCard
              key={index}
              speed={chunk["speed"]}
              elapsedTime={chunk["duration"]}
              sentiment={sentiment}
              text={text}
            />
          );
        })}
    </div>
  );
};

export default InDepthContainer;
