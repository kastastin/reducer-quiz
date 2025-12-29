import Timer from "../Timer";
import Progress from "../Progress";
import Question from "../Question";
import Footer from "../layout/Footer";
import NextButton from "../NextButton";

const ActiveScreen = () => {
  return (
    <>
      <Progress />
      <Question />
      <Footer>
        <Timer />
        <NextButton />
      </Footer>
    </>
  );
};

export default ActiveScreen;
