"use client";
import { useEffect, useState } from "react";
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
  possibleSubsubs,
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

  const [realSubject, setRealSubject] = useState(emptyChoice);
  const [realInfo, setRealInfo] = useState(emptyChoice);
  const [chosenSubject, setChosenSubject] = useState(emptyChoice);
  const [chosenInfo, setChosenInfo] = useState(emptyChoice);
  const [result, setResult] = useState(ExerciseResult.None);
  const [chosenSubsub, setChosenSubsub] = useState(emptyChoice);

  // Testing options
  const [irishToEnglish, setIrishToEnglish] = useState(true);
  const [nounSubjects, setNounSubjects] = useState(false);

  const showSubsubTable = !irishToEnglish && nounSubjects;

  useEffect(() => {
    goNext();
  }, []);

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

  function chooseSubsub(subsub: Noun) {
    setResult(ExerciseResult.None);
    if (subsub.irish == chosenSubsub.irish) {
      setChosenSubsub(emptyChoice);
      return;
    }

    setChosenSubsub(subsub);
  }

  function checkAnswer() {
    const correct =
      realSubject.irish === chosenSubject.irish &&
      realInfo.irish === chosenInfo.irish;
    if (correct) {
      setResult(ExerciseResult.Correct);
    } else {
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

  function goNext(ns: boolean = nounSubjects) {
    console.log("ns: ", ns);
    let subject = realSubject;
    let info = realInfo;
    const subjectList = ns ? nounSubjectChoices : possibleSubjectChoices;
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
    setChosenSubsub(emptyChoice);
  }

  function goToLevel(level: number) {
    if (level == 1) {
      setIrishToEnglish(true);
      setNounSubjects(false);
      goNext(false);
    } else if (level == 2) {
      setIrishToEnglish(false);
      setNounSubjects(false);
      goNext(false);
    } else if (level == 3) {
      setIrishToEnglish(true);
      setNounSubjects(true);
      goNext(true);
    } else if (level == 4) {
      setIrishToEnglish(false);
      setNounSubjects(true);
      goNext(true);
    }
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
          chosenSubSubject={chosenSubsub}
        />

        {/* Input Table */}
        <div className={`flex ${!irishToEnglish && "flex-row-reverse"} gap-3`}>
          <InputTable
            irish={!irishToEnglish}
            list={nounSubjects ? nounSubjectChoices : possibleSubjectChoices}
            onClick={chooseSubject}
            color="border-blue-400"
          />
          {showSubsubTable && (
            <InputTable
              irish={!irishToEnglish}
              list={possibleSubsubs}
              onClick={chooseSubsub}
              color="border-blue-300"
            />
          )}
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
            goNext={() => goNext()}
            checkAnswer={checkAnswer}
          />
        </div>
        <div className="flex flex-row w-full gap-10">
          <button onClick={() => goToLevel(1)}>Lvl 1</button>
          <button onClick={() => goToLevel(2)}>Lvl 2</button>
          <button onClick={() => goToLevel(3)}>Lvl 3</button>
          <button onClick={() => goToLevel(4)}>Lvl 4</button>
        </div>
      </main>
    </div>
  );
}
