import "../Styles/SpeechSummary.scss";

const SpeechSummaryTable = ({ data, status }) => {
  if (status === "not-started") {
    return "Waiting for user to upload file";
  }

  if (status === "loading" || data == null) {
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
                data.filler_words_per_minute < 3
                  ? "data__positive"
                  : "data__negative"
              }
            >
              {data.filler_words_per_minute.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>
              <h3 className="title">Speaking Speed</h3>
            </td>
            <td
              className={
                data.speaking_speed >= 140 && data.speaking_speed <= 160
                  ? "data__positive"
                  : "data__negative"
              }
            >
              {data.speaking_speed.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>
              <h3 className="title">Average Sentiment</h3>
            </td>
            <td
              className={
                data.average_sentiment > 0 ? "data__positive" : "data__negative"
              }
            >
              {data.average_sentiment}
            </td>
          </tr>
          <tr>
            <td>
              <h2 className="title">Score</h2>
            </td>
            <td
              className={data.score >= 70 ? "data__positive" : "data__negative"}
            >
              <h2>{data.score.toFixed(0)}</h2>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
};

export default SpeechSummaryTable;
