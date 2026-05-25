import { Noun } from "../noun";
import { conjugateToBe, getSubSub } from "../util";

type Props = {
  irish: boolean;
  realInfo: Noun;
  realSubject: Noun;
  nounSubject: boolean;
};
export default function TargetSentence({
  irish,
  realInfo,
  realSubject,
  nounSubject,
}: Props) {
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
      {irish && nounSubject && (
        <div className="flex-col">
          <div className="underline decoration-blue-300">
            {getSubSub(realSubject)}
          </div>
          <div className="text-xs text-blue-300">sub-subject</div>
        </div>
      )}
      <div>
        <div className="underline decoration-blue-400">
          {irish ? realSubject.irish : realSubject.english}
        </div>
        <div className="text-xs text-blue-400">subject</div>
      </div>
      {!irish && <div> {conjugateToBe(realSubject)} </div>}
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
