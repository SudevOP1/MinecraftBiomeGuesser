import { useState } from "react";
import OuterDiv from "../components/OuterDiv";
import Divider from "../components/Divider";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const TestComponent = ({ test, username }) => {
  let apiUrl = "http://127.0.0.1:8000/";
  let [currentIndex, setCurrentIndex] = useState(0);
  let [score, setScore] = useState(0);
  let [selectedOption, setSelectedOption] = useState(null);
  let [answered, setAnswered] = useState(false);
  let [finished, setFinished] = useState(false);
  let [loading, setLoading] = useState(false);

  let currentQuestion = test[currentIndex];
  let navigate = useNavigate();

  let handleOptionClick = (option) => {
    if (answered) return;
    setSelectedOption(option);
    setAnswered(true);
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      if (currentIndex + 1 === test.length) {
        setFinished(true);
        submitTest();
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setAnswered(false);
      }
    }, 1000);
  };

  let submitTest = async () => {
    setLoading(true);
    try {
      let response = await fetch(apiUrl + "base/submit_score/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          score: parseInt(score),
        }),
      });
      let data = await response.json();
      if (!data.success) {
        alert(data.error);
      }
    } catch (e) {
      alert(`something went wrong: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <OuterDiv maxWidth="max-w-5xl">
        {(loading || !test || test.length === 0) && <Loader />}

        <div className="w-full text-center">
          <p className="text-4xl font-bold text-indigo-300 mb-2">Biome Quiz</p>
          <p className="text-lg text-indigo-400 mb-6">
            {!finished && `Question ${currentIndex + 1} of ${test.length}`}
          </p>
        </div>

        <Divider />

        {!loading && finished ? (
          <div className="flex flex-col items-center">
            <div className="text-center text-3xl text-green-400">
              Your Score: {score} / {test.length * 10}
            </div>
            {!loading && finished && (
              <button
                onClick={() => navigate("/")}
                className="bg-indigo-600 text-black text-lg font-semibold cursor-pointer w-1/3 px-6 py-2
              rounded-full border-4 border-[#020617] shadow-[0px_5px_0px_0px_#020617]
              active:shadow-none active:translate-y-1 transition duration-150 mt-4"
              >
                Go Home
              </button>
            )}
          </div>
        ) : null}
        {!loading && !finished && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
            <img
              src={apiUrl + currentQuestion.img}
              alt="Biome Screenshot"
              className="w-2/3 object-cover rounded-xl border-2 border-indigo-600"
            />

            {/* options */}
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              {currentQuestion.options.map((option) => {
                let optionClasses = "";

                if (answered) {
                  if (option === currentQuestion.answer) {
                    // green
                    optionClasses = "bg-green-500 border-green-700 text-black";
                  } else if (option === selectedOption) {
                    // red
                    optionClasses = "bg-red-500 border-red-700 text-black";
                  } else {
                    // indigo without hover
                    optionClasses =
                      "bg-indigo-800 border-indigo-600 text-white";
                  }
                  // indigo with hover
                } else {
                  optionClasses =
                    "bg-indigo-800 border-indigo-600 hover:bg-indigo-600 text-white";
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className={`text-xl p-4 rounded-xl border-2 transition duration-150 cursor-pointer ${optionClasses}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </OuterDiv>
    </>
  );
};

export default TestComponent;
