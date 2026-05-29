import { Noun } from "../noun";
import { conjugateToBe } from "../util";

type Props = {
  irish: boolean;
  chosenInfo: Noun;
  chosenSubject: Noun;
  nounSubject: boolean;
  chosenSubSubject: Noun;
};

export default function AnswerArea({
  irish,
  chosenInfo,
  chosenSubject,
  nounSubject,
  chosenSubSubject,
}: Props) {
  const showSubSub = irish && nounSubject;
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

        {showSubSub && (
          <div className="flex-col">
            <div className="border-2 border-blue-300 border-solid min-w-20 min-h-10 p-1">
              {chosenSubSubject.irish}
            </div>
            <div className="text-xs text-blue-300">sub-subject</div>
          </div>
        )}

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
        <div className="text-gray-400 p-1">{conjugateToBe(chosenSubject)}</div>
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
