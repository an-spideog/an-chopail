"use client";
import next from "next";
import { useState } from "react";

export default function Home() {
  enum Count {
    Singular,
    Plural,
  }

  type TranslationPair = {
    english: string;
    irish: string;
    count: Count;
  };

  const possibleSubjectChoices = [
    { english: "I", irish: "mé", count: Count.Singular },
    { english: "you", irish: "thú", count: Count.Singular },
    { english: "he", irish: "é", count: Count.Singular },
    { english: "she", irish: "í", count: Count.Singular },
    { english: "we", irish: "sinn", count: Count.Plural },
    { english: "you (pl.)", irish: "sibh", count: Count.Plural },
    { english: "they", irish: "iad", count: Count.Plural },
  ];
  const possibleInfoChoices = [
    { english: "a teacher", irish: "múinteoir", count: Count.Singular },
    { english: "a doctor", irish: "dochtúir", count: Count.Singular },
    { english: "a woman", irish: "bean", count: Count.Singular },
    { english: "doctors", irish: "dochtúirí", count: Count.Plural },
    { english: "men", irish: "fir", count: Count.Plural },
    { english: "teachers", irish: "múinteoirí", count: Count.Plural },
  ];

  enum ExerciseResult {
    Correct,
    Incorrect,
    None,
  }

  const emptyChoice = { english: "", irish: "" };

  const [realSubject, setRealSubject] = useState(possibleSubjectChoices[0]);
  const [realInfo, setRealInfo] = useState(possibleInfoChoices[0]);
  const [chosenSubject, setChosenSubject] = useState(emptyChoice);
  const [chosenInfo, setChosenInfo] = useState(emptyChoice);
  const [result, setResult] = useState(ExerciseResult.None);

  function chooseInfo(info: TranslationPair) {
    if (info.irish == chosenInfo.irish) {
      setChosenInfo(emptyChoice);
      return;
    }
    setChosenInfo(info);
    setResult(ExerciseResult.None);
  }

  function chooseSubject(subject: TranslationPair) {
    if (subject.irish == chosenSubject.irish) {
      setChosenSubject(emptyChoice);
      return;
    }
    setChosenSubject(subject);
    setResult(ExerciseResult.None);
  }

  function conjugateToBe(subject: string) {
    if (subject == "I") {
      return "am";
    }

    if (subject == "he" || subject == "she" || subject == "") {
      return "is";
    }

    return "are";
  }

  function checkAnswer() {
    const correct =
      realSubject.irish === chosenSubject.irish &&
      realInfo.irish === chosenInfo.irish;
    if (correct) {
      console.log("answer correct");
      setResult(ExerciseResult.Correct);
    } else {
      console.log("answer incorrect");
      setResult(ExerciseResult.Incorrect);
    }
  }

  function goNext() {
    let subject = realSubject;
    let info = realInfo;
    while (
      subject.count != info.count ||
      (subject == realSubject && info == realInfo)
    ) {
      const nextSubject = Math.floor(
        Math.random() * possibleSubjectChoices.length,
      );
      const nextInfo = Math.floor(Math.random() * possibleInfoChoices.length);
      subject = possibleSubjectChoices[nextSubject];
      info = possibleInfoChoices[nextInfo];
    }

    setRealSubject(subject);
    setRealInfo(info);
    setResult(ExerciseResult.None);
    setChosenInfo(emptyChoice);
    setChosenSubject(emptyChoice);
  }

  function CheckButton(props: { result: ExerciseResult }) {
    let result = props.result;
    let color = "gray-200";
    if (result == ExerciseResult.Correct) {
      color = "green-400";
    } else if (result == ExerciseResult.Incorrect) {
      color = "red-400";
    }

    return (
      <button
        className={`border-2 border-${color} text-${color} p-2`}
        onClick={result == ExerciseResult.Correct ? goNext : checkAnswer}
      >
        {result == ExerciseResult.Correct ? (
          <span>Next {">"}</span>
        ) : (
          <span>Check {">"}</span>
        )}
      </button>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex gap-10 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* Irish */}
        <div className="flex gap-3 text-3xl">
          <div> Is </div>
          <div className="flex-col">
            <div className="underline decoration-yellow-400">
              {realInfo.irish}
            </div>
            <div className="text-xs text-yellow-400">information</div>
          </div>
          <div>
            <div className="underline decoration-blue-400">
              {realSubject.irish}
            </div>
            <div className="text-xs text-blue-400">subject</div>
          </div>
        </div>

        {/* Answer Area */}
        <div className="flex gap-3 text-3xl">
          <div>
            <div className="border-2 border-blue-400 border-solid min-w-20 min-h-10 p-1">
              {chosenSubject.english}
            </div>
            <div className="text-xs text-blue-400">subject</div>
          </div>
          <div className="text-gray-400 p-1">
            {" "}
            {conjugateToBe(chosenSubject.english)}{" "}
          </div>
          <div className="flex-col">
            <div className="border-2 border-yellow-400 border-solid min-w-20 min-h-10 p-1">
              {chosenInfo.english}
            </div>
            <div className="text-xs text-yellow-400">information</div>
          </div>
        </div>

        {/* Input Table */}
        <div className="flex">
          <div className="flex flex-wrap gap-2 max-w-50">
            {possibleSubjectChoices.map((subject) => (
              <button
                className="p-2 border-2 border-blue-400 items-center align-center justify-center text-center"
                onClick={() => chooseSubject(subject)}
              >
                {subject.english}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 max-w-50">
            {possibleInfoChoices.map((info) => (
              <button
                className="p-2 border-2 border-yellow-400"
                onClick={() => chooseInfo(info)}
              >
                {info.english}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-row-reverse w-full">
          <CheckButton result={result} />
        </div>
      </main>
    </div>
  );
}
