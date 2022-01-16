import FileUpload from "../components/FileUpload";
import InDepthContainer from "../components/InDepthContainer";
import SpeechSummary from "../components/SpeechSummary";

const Home = () => {
  return (
    <div>
      <FileUpload />
      <SpeechSummary />
      <InDepthContainer />
    </div>
  );
};

export default Home;
