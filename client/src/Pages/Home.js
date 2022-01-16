import FileUpload from "../components/FileUpload";
import InDepthContainer from "../components/InDepthContainer";
import SpeechSummary from "../components/SpeechSummary";
import "../Styles/HomePage.scss";

const Home = () => {
  return (
    <div className="pageContainer">
      <div className="left">
        <div className="upload">
          <FileUpload />
        </div>
        <div className="speechSummary">
          <SpeechSummary />
        </div>
      </div>
      <div className="right">
        <InDepthContainer />
      </div>
    </div>
  );
};

export default Home;
