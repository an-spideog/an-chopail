import { Count, Gender, Noun } from "./noun";

export function chooseRandom(list: any[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export function conjugateToBe(subject: Noun) {
  const eng = subject.english;
  if (eng == "I") {
    return "am";
  }

  if (subject.count == Count.Plural) {
    return "are";
  }

  return "is";
}

export function getSubSub(noun: Noun) {
  if (noun.count == Count.Plural) {
    return "iad";
  }

  if (noun.gender == Gender.Feminine) {
    return "í";
  }

  return "é";
}
