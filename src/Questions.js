import { useEffect, useState } from "react";
import Question from "./Question";

export default function Questions() {
  const [data, setData] = useState([]);
  const [countCorrect, setCountCorrect] = useState(0);
  const [checkAns, setCheckAns] = useState(false);
  const [allClientAnswer, setAllClientAnswer] = useState(data);
  function fetchQuestion() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setAllClientAnswer(
          data.results.map((obj) => ({ ...obj, isCollect: false }))
        );
      });
  }
  function playAgain() {
    setData([]);
    setCountCorrect(0); 
    setCheckAns(false); 
    fetchQuestion(); 
  }
  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div className="flex justify-center items-center lg:h-screen relative overflow-x-hidden bg-slate-50">
      <img
        src="/assets/blob 5.png"
        alt="blob 5"
        width={297}
        height={235}
        className="absolute hidden lg:block -right-20 top-0"
      />
      <img
        src="/assets/blob 5 (1).png"
        alt="blob 6"
        width={297}
        height={235}
        className="absolute -left-20 bottom-0 hidden lg:block"
      />
      <div className="w-[70%] flex flex-col gap-3 ">
        {data.map((value, index) => {
          return (
            <Question
              value={value}
              key={index}
              setCountCorrect={setCountCorrect}
              countCorrect={countCorrect}
              checkAns={checkAns}
              id={index}
              allClientAnswer={allClientAnswer}
              setAllClientAnswer={setAllClientAnswer}
            />
          );
        })}
        {checkAns ? (
          <div className="flex gap-4 items-center w-fit m-auto">
            <div className="text-lg">
              You scored{" "}
              {allClientAnswer.filter((value) => value.isCollect).length}/5
              correct answers
            </div>
            <button
              onClick={() => {
                playAgain();
              }}
              className="bg-primary text-white px-8 pt-4 pb-5 text-2xl rounded-2xl mt-4 w-fit m-auto"
            >
              Play again
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setCheckAns(true);
            }}
            className="bg-primary text-xl w-full lg:w-1/5 text-white px-8 pt-4 pb-5 rounded-2xl "
          >
            {data.length === 0 ? "please wait" : "Check answers"}
          </button>
        )}
      </div>
    </div>
  );
}
