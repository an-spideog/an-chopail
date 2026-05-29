import { Count, Gender, Noun } from "./noun";

export const possibleSubjectChoices: Noun[] = [
  { english: "I", irish: "mé", count: Count.Singular, gender: Gender.None },
  {
    english: "you",
    irish: "thú",
    count: Count.Singular,
    gender: Gender.None,
  },
  {
    english: "he",
    irish: "é",
    count: Count.Singular,
    gender: Gender.Masculine,
  },
  {
    english: "she",
    irish: "í",
    count: Count.Singular,
    gender: Gender.Feminine,
  },
  { english: "we", irish: "sinn", count: Count.Plural, gender: Gender.None },
  {
    english: "you (pl.)",
    irish: "sibh",
    count: Count.Plural,
    gender: Gender.None,
  },
  { english: "they", irish: "iad", count: Count.Plural, gender: Gender.None },
];

export const possibleInfoChoices: Noun[] = [
  {
    english: "a teacher",
    irish: "múinteoir",
    count: Count.Singular,
    gender: Gender.Masculine,
  },
  {
    english: "a doctor",
    irish: "dochtúir",
    count: Count.Singular,
    gender: Gender.Masculine,
  },
  {
    english: "soldiers",
    irish: "saighdiúirí",
    count: Count.Plural,
    gender: Gender.Masculine,
  },
  {
    english: "doctors",
    irish: "dochtúirí",
    count: Count.Plural,
    gender: Gender.Masculine,
  },
  {
    english: "chefs",
    irish: "cócairí",
    count: Count.Plural,
    gender: Gender.Masculine,
  },
  {
    english: "teachers",
    irish: "múinteoirí",
    count: Count.Plural,
    gender: Gender.Masculine,
  },
  {
    english: "a librarian",
    irish: "leabharlannaí",
    count: Count.Singular,
    gender: Gender.Masculine,
  },
  {
    english: "a guard",
    irish: "garda",
    count: Count.Singular,
    gender: Gender.Masculine,
  },
  {
    english: "scientists",
    irish: "eolaithe",
    count: Count.Plural,
    gender: Gender.Masculine,
  },
];

export const nounSubjectChoices: Noun[] = [
  {
    english: "the child",
    irish: "an leanbh",
    count: Count.Singular,
    gender: Gender.Masculine,
  },
  {
    english: "the priest",
    irish: "an sagart",
    count: Count.Singular,
    gender: Gender.Masculine,
  },
  {
    english: "the woman",
    irish: "an bhean",
    count: Count.Singular,
    gender: Gender.Feminine,
  },
  {
    english: "the girl",
    irish: "an cailín",
    count: Count.Singular,
    gender: Gender.Feminine,
  },
  {
    english: "the cow",
    irish: "an bhó",
    count: Count.Singular,
    gender: Gender.Feminine,
  },
  {
    english: "the man",
    irish: "an fear",
    count: Count.Singular,
    gender: Gender.Masculine,
  },
  {
    english: "the people",
    irish: "na daoine",
    count: Count.Plural,
    gender: Gender.Masculine,
  },
  {
    english: "the birds",
    irish: "na héin",
    count: Count.Plural,
    gender: Gender.Masculine,
  },
];

export const possibleSubsubs: Noun[] = [
  {
    english: "he",
    irish: "é",
    count: Count.Singular,
    gender: Gender.Masculine,
  },
  {
    english: "she",
    irish: "í",
    count: Count.Singular,
    gender: Gender.Feminine,
  },
  { english: "they", irish: "iad", count: Count.Plural, gender: Gender.None },
];
