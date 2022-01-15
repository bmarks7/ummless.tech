import React from "react";

const SpeechSummaryTable = ({ data }) => {
  if (!data) {
    return "Loading...";
  }

  return (
    <table>
      <tr>
        <td>
          <h3>Filler Words per Minute</h3>
        </td>
        <td>{data.fillerWPM}</td>
      </tr>
      <tr>
        <td>
          <h3>Speaking Speed</h3>
        </td>
        <td>{data.speed}</td>
      </tr>
      <tr>
        <td>
          <h3>Average Sentiment</h3>
        </td>
        <td>{data.averageSentiment}</td>
      </tr>
      <tr>
        <td>
          <h2>Score</h2>
        </td>
        <td>{data.score}</td>
      </tr>
    </table>
  );
};

export default SpeechSummaryTable;
