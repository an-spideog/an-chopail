"use client";
import { useState } from "react";
import CheckButton from "./components/CheckButton";
import InputTable from "./components/InputTable";
import { chooseRandom } from "./util";
import AnswerArea from "./components/AnswerArea";
import TargetSentence from "./components/TargetSentence";
import { Count, Gender, Noun } from "./noun";
import {
  nounSubjectChoices,
  possibleInfoChoices,
  possibleSubjectChoices,
} from "./words";

export default function Home() {
  enum ExerciseResult {
    Correct,
    Incorrect,
    None,
  }

  const emptyChoice: Noun = {
    english: "",
    irish: "",
    count: Count.Singular,
    gender: Gender.Masculine,
  };

  const [realSubject, setRealSubject] = useState(possibleSubjectChoices[0]);
  const [realInfo, setRealInfo] = useState(possibleInfoChoices[0]);
  const [chosenSubject, setChosenSubject] = useState(emptyChoice);
  const [chosenInfo, setChosenInfo] = useState(emptyChoice);
  const [result, setResult] = useState(ExerciseResult.None);

  // Testing options
  const [irishToEnglish, setIrishToEnglish] = useState(true);
  const [nounSubjects, setNounSubjects] = useState(false);

  function chooseInfo(info: Noun) {
    setResult(ExerciseResult.None);
    if (info.irish == chosenInfo.irish) {
      setChosenInfo(emptyChoice);
      return;
    }
    setChosenInfo(info);
  }

  function chooseSubject(subject: Noun) {
    setResult(ExerciseResult.None);
    if (subject.irish == chosenSubject.irish) {
      setChosenSubject(emptyChoice);
      return;
    }
    setChosenSubject(subject);
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

  function changeDefinite() {
    setNounSubjects((current) => {
      goNext(!current);
      return !current;
    });
  }

  function goNext(nounSubjects: boolean = false) {
    let subject = realSubject;
    let info = realInfo;
    const subjectList = nounSubjects
      ? nounSubjectChoices
      : possibleSubjectChoices;
    while (
      subject.count != info.count ||
      (subject == realSubject && info == realInfo)
    ) {
      subject = chooseRandom(subjectList);
      info = chooseRandom(possibleInfoChoices);
    }

    setRealSubject(subject);
    setRealInfo(info);
    setResult(ExerciseResult.None);
    setChosenInfo(emptyChoice);
    setChosenSubject(emptyChoice);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex gap-10 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <TargetSentence
          irish={irishToEnglish}
          realInfo={realInfo}
          realSubject={realSubject}
          nounSubject={nounSubjects}
        />
        <AnswerArea
          irish={!irishToEnglish}
          chosenInfo={chosenInfo}
          chosenSubject={chosenSubject}
          nounSubject={nounSubjects}
        />

        {/* Input Table */}
        <div className={`flex ${!irishToEnglish && "flex-row-reverse"}`}>
          <InputTable
            irish={!irishToEnglish}
            list={nounSubjects ? nounSubjectChoices : possibleSubjectChoices}
            onClick={chooseSubject}
            color="border-blue-400"
          />
          <InputTable
            irish={!irishToEnglish}
            list={possibleInfoChoices}
            onClick={chooseInfo}
            color="border-yellow-400"
          />
        </div>

        <div className="flex flex-row-reverse w-full gap-10">
          <CheckButton
            result={result}
            goNext={goNext}
            checkAnswer={checkAnswer}
          />
          <button className="p-2" onClick={switchLanguages}>
            Change Translation Direction
          </button>
          <button className="p-2" onClick={changeDefinite}>
            Change definite
          </button>
        </div>
      </main>
    </div>
  );
}
