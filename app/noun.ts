export enum Count {
  Singular,
  Plural,
}

export enum Gender {
  Masculine,
  Feminine,
  None,
}

export type Noun = {
  english: string;
  irish: string;
  count: Count;
  gender: Gender;
};
