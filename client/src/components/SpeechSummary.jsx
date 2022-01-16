import SpeechSummaryTable from "./SpeechSummaryTable";
import "../Styles/SpeechSummary.scss";

const SpeechSummary = ({ status, data }) => {
  return (
    <div>
      <h1 className="title">Speech Summary</h1>
      <SpeechSummaryTable data={data} status={status} />
    </div>
  );
};

export default SpeechSummary;
