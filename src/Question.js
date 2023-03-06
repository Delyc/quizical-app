import {useState } from "react";
const Question = ({value, checkAns, id, setAllClientAnswer}) => {
  const allAnswer = [
    ...value.incorrect_answers,
    value.correct_answer,
  ];
  const [selected, setSelected] = useState(null);

  function styleQuestion() {
    if (checkAns) {
      if (selected === value.correct_answer) {
        return "bg-green-900  text-white border-none";
      } else {
        return "bg-red-900  text-white border-none opacity-50";
      }
    } else {
      return "bg-violet-200 text-slate-700 border-none";
    }
  }
  return (
    <div className=" border-b py-2">
      <h2
        className="text-xl font-semibold text-slate-700"
        dangerouslySetInnerHTML={{ __html: value.question }}
      ></h2>
      <div className="flex gap-2 lg:flex-nowrap flex-wrap my-3">
        {allAnswer.sort().map((value, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                !checkAns && setSelected(value);
                setAllClientAnswer((prev) => {
                  prev[id] = {
                    ...prev[id],
                    isCollect:
                      value === value.correct_answer ? true : false,
                  };
                  return prev;
                });
              }}
              className={`rounded-xl border-2 py-1 px-5 cursor-pointer ${
                value === selected && styleQuestion()
              }
              ${
                checkAns && value.correct_answer === value
                  ? "bg-green-900 text-white border-none"
                  : "border-slate-700"
              }
              `}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Question