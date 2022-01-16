import React from "react";
import "../Styles/InDepthCard.scss";

const InDepthCard = ({ speed, elapsedTime, sentiment, text }) => {
  const fillerWords = ["um", "umm", "uh", "uhh", "like"];
  const wordArray = text.split(" ");

  return (
    <div className="inDepthCard">
      <p
        className={
          sentiment === "-"
            ? "sentimentSymbol__negative"
            : "sentimentSymbol__positive"
        }
      >
        {sentiment}
      </p>
      <div className="inDepthCardRight">
        <p>
          {wordArray.map(
            (word, key) =>
              (!fillerWords.includes(
                word
                  .toLowerCase()
                  .replace(/[^\w\s]|_/g, "")
                  .replace(/\s+/g, " ")
              ) && (
                <span className="regularWord" key={key}>
                  {word}{" "}
                </span>
              )) ||
              (fillerWords.includes(
                word
                  .toLowerCase()
                  .replace(/[^\w\s]|_/g, "")
                  .replace(/\s+/g, " ")
              ) && (
                <span className="fillerWord" key={key}>
                  {word}{" "}
                </span>
              ))
          )}
        </p>
        <div className="inDepthCardDetails">
          <p className="elapsedTime">({elapsedTime}s)</p>
          <p
            className={
              speed >= 140 && speed <= 160
                ? "speed__positive"
                : "speed__negative"
            }
          >
            {" "}
            {speed.toFixed(2)} wpm
          </p>
        </div>
      </div>
    </div>
  );
};

export default InDepthCard;
