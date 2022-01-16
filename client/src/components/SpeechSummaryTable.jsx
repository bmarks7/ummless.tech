import "../Styles/SpeechSummary.scss";

const SpeechSummaryTable = ({ data, status }) => {
  if (status === "not-started") {
    return "Waiting for user to upload file";
  }

  if (status === "loading") {
    return "Analyzing...";
  } else {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <h3 className="title">Filler Words per Minute</h3>
            </td>
            <td
              className={
                data.fillerWPM < 3 ? "data__positive" : "data__negative"
              }
            >
              {data.fillerWPM}
            </td>
          </tr>
          <tr>
            <td>
              <h3 className="title">Speaking Speed</h3>
            </td>
            <td
              className={
                data.speed >= 140 && data.speed <= 160
                  ? "data__positive"
                  : "data__negative"
              }
            >
              {data.speed}
            </td>
          </tr>
          <tr>
            <td>
              <h3 className="title">Average Sentiment</h3>
            </td>
            <td
              className={
                data.averageSentiment > 0 ? "data__positive" : "data__negative"
              }
            >
              {data.averageSentiment}
            </td>
          </tr>
          <tr>
            <td>
              <h2 className="title">Score</h2>
            </td>
            <td
              className={data.score >= 70 ? "data__positive" : "data__negative"}
            >
              <h2>{data.score}</h2>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
};

export default SpeechSummaryTable;
