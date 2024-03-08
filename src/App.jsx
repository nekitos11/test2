import "./App.css";
import { Banner } from "./components/Banner/index.js";
import { PrizeBlock } from "./components/PrizeBlock/index.js";
import { Button } from "./components/Button/index.js";
import { AdditionalPrizeBlock } from "./components/AdditionalPrizeBlock/index.js";
import { AnswersBlock } from "./components/AnswersBlock/index.js";
import { HeaderFooter } from "./components/HeaderFooter/index.js";

function App() {
  const onJoinClick = () => {
    const answerForm = document.getElementById("answerForm");
    window.scrollTo({
      top: window.scrollY + answerForm.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };
  return (
    <>
      <HeaderFooter />
      <Banner />
      <PrizeBlock />
      <Button wrapperClassname={"joinBtn"} onClick={onJoinClick} label="JOIN NOW" />
      <AdditionalPrizeBlock />
      <AnswersBlock />
      <div className={"footer"}>
        <HeaderFooter />
      </div>
    </>
  );
}

export default App;
