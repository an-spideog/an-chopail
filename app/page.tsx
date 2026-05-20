"use client";
import { useState } from "react";
import { useRouter } from "next/router";

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
    { english: "women", irish: "mná", count: Count.Plural },
    { english: "doctors", irish: "dochtúirí", count: Count.Plural },
    { english: "men", irish: "fir", count: Count.Plural },
    { english: "teachers", irish: "múinteoirí", count: Count.Plural },
    { english: "a librarian", irish: "leabharlannaí", count: Count.Singular },
    { english: "a person", irish: "duine", count: Count.Singular },
    { english: "scientists", irish: "eolaithe", count: Count.Plural },
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

  const [irishToEnglish, setIrishToEnglish] = useState(true);

  function chooseRandom(list: any[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function chooseInfo(info: TranslationPair) {
    setResult(ExerciseResult.None);
    if (info.irish == chosenInfo.irish) {
      setChosenInfo(emptyChoice);
      return;
    }
    setChosenInfo(info);
  }

  function chooseSubject(subject: TranslationPair) {
    setResult(ExerciseResult.None);
    if (subject.irish == chosenSubject.irish) {
      setChosenSubject(emptyChoice);
      return;
    }
    setChosenSubject(subject);
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

  function switchLanguages() {
    goNext();
    setIrishToEnglish((current) => !current);
  }

  function goNext() {
    let subject = realSubject;
    let info = realInfo;
    while (
      subject.count != info.count ||
      (subject == realSubject && info == realInfo)
    ) {
      subject = chooseRandom(possibleSubjectChoices);
      info = chooseRandom(possibleInfoChoices);
    }

    setRealSubject(subject);
    setRealInfo(info);
    setResult(ExerciseResult.None);
    setChosenInfo(emptyChoice);
    setChosenSubject(emptyChoice);
  }

  function CheckButton(props: { result: ExerciseResult }) {
    let result = props.result;
    let border = "border-gray-200";
    let text = "text-gray-200";

    if (result == ExerciseResult.Correct) {
      border = "border-green-400";
      text = "text-green-400";
    } else if (result == ExerciseResult.Incorrect) {
      border = "border-red-400";
      text = "text-red-400";
    }

    return (
      <button
        className={`border-2 ${border} ${text} p-2`}
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

  function TargetSentence({ irish }) {
    return (
      <div className="flex gap-3 text-3xl">
        {irish && <div> Is </div>}
        {irish && (
          <div className="flex-col">
            <div className="underline decoration-yellow-400">
              {realInfo.irish}
            </div>
            <div className="text-xs text-yellow-400">information</div>
          </div>
        )}
        <div>
          <div className="underline decoration-blue-400">
            {irish ? realSubject.irish : realSubject.english}
          </div>
          <div className="text-xs text-blue-400">subject</div>
        </div>
        {!irish && <div> {conjugateToBe(realSubject.english)} </div>}
        {!irish && (
          <div className="flex-col">
            <div className="underline decoration-yellow-400">
              {realInfo.english}
            </div>
            <div className="text-xs text-yellow-400">information</div>
          </div>
        )}
      </div>
    );
  }

  function AnswerArea({ irish }) {
    if (irish) {
      return (
        <div className="flex gap-3 text-3xl">
          <div>Is</div>

          <div className="flex-col">
            <div className="border-2 border-yellow-400 border-solid min-w-20 min-h-10 p-1">
              {chosenInfo.irish}
            </div>
            <div className="text-xs text-yellow-400">information</div>
          </div>

          <div>
            <div className="border-2 border-blue-400 border-solid min-w-20 min-h-10 p-1">
              {chosenSubject.irish}
            </div>
            <div className="text-xs text-blue-400">subject</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex gap-3 text-3xl">
          <div>
            <div className="border-2 border-blue-400 border-solid min-w-20 min-h-10 p-1">
              {chosenSubject.english}
            </div>
            <div className="text-xs text-blue-400">subject</div>
          </div>
          <div className="text-gray-400 p-1">
            {conjugateToBe(chosenSubject.english)}
          </div>
          <div className="flex-col">
            <div className="border-2 border-yellow-400 border-solid min-w-20 min-h-10 p-1">
              {chosenInfo.english}
            </div>
            <div className="text-xs text-yellow-400">information</div>
          </div>
        </div>
      );
    }
  }

  enum InputType {
    Information,
    Subject,
  }

  function InputTable({ irish, type }) {
    let list = possibleSubjectChoices;
    let choose = chooseSubject;
    if (type == InputType.Information) {
      list = possibleInfoChoices;
      choose = chooseInfo;
    }

    return (
      <div className="flex flex-wrap gap-2 max-w-50 items-start content-start">
        {list.map((word) => (
          <button
            className={`p-2 border-2 ${type == InputType.Subject ? "border-blue-400" : "border-yellow-400"} text-center max-h-15`}
            onClick={() => choose(word)}
          >
            {irish ? word.irish : word.english}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex gap-10 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <TargetSentence irish={irishToEnglish} />
        <AnswerArea irish={!irishToEnglish} />

        {/* Input Table */}
        <div className={`flex ${!irishToEnglish && "flex-row-reverse"}`}>
          <InputTable type={InputType.Subject} irish={!irishToEnglish} />
          <InputTable type={InputType.Information} irish={!irishToEnglish} />
        </div>

        <div className="flex flex-row-reverse w-full gap-10">
          <CheckButton result={result} />
          <button className="p-2" onClick={switchLanguages}>
            Change Translation Direction (For Testing)
          </button>
        </div>
      </main>
    </div>
  );
}
