import { Noun } from "../noun";

enum InputType {
  Information,
  Subject,
}

type Props = {
  irish: boolean;
  list: Noun[];
  onClick: (word: Noun) => void;
  color: string;
};

export default function InputTable({ irish, list, onClick, color }: Props) {
  return (
    <div className="flex flex-wrap gap-2 max-w-50 items-start content-start">
      {list.map((word) => (
        <button
          className={`p-2 border-2 ${color} text-center max-h-15`}
          onClick={() => onClick(word)}
        >
          {irish ? word.irish : word.english}
        </button>
      ))}
    </div>
  );
}
