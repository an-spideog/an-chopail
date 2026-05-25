enum ExerciseResult {
  Correct,
  Incorrect,
  None,
}

type Props = {
  result: ExerciseResult;
  goNext: () => void;
  checkAnswer: () => void;
};

export default function CheckButton({ result, goNext, checkAnswer }: Props) {
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
