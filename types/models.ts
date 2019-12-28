import { firestore } from 'firebase';

export type Todo = {
  readonly id: string;
  readonly text: string;
  readonly completed: boolean;
  readonly createdAt?: firestore.Timestamp;
  readonly updatedAt?: firestore.Timestamp;
};

export type User = {
  readonly uid: string;
  readonly name: string;
};

export type AOJUserDataOnFirestore = {
  readonly data: AOJUser;
  readonly createdAt?: firestore.Timestamp;
  readonly updatedAt?: firestore.Timestamp;
};

export type AOJUser = {
  [key: string]: string | number | null | AOJUserStatus;
  readonly id: string;
  readonly name: string;
  readonly affiliation: string;
  readonly registerDate: number;
  readonly lastSubmitDate: number;
  readonly policy: string;
  readonly country: string;
  readonly birthYear: number;
  readonly displayLanguage: string;
  readonly defaultProgrammingLanguage: string;
  readonly avatar: null;
  readonly status: AOJUserStatus;
  readonly url: string;
};

export type AOJUserStatus = {
  readonly submissions: number;
  readonly solved: number;
  readonly accepted: number;
  readonly wrongAnswer: number;
  readonly timeLimit: number;
  readonly memoryLimit: number;
  readonly outputLimit: number;
  readonly compileError: number;
  readonly runtimeError: number;
};

export type Problem = {
  judgeId: number;
  userId: string;
  problemId: string;
  language: string;
  version: string;
  submissionDate: number;
  judgeDate: number;
  cpuTime: number;
  memory: number;
  codeSize: number;
  server: number;
  policy: string;
  rating: number;
  review: number;
};
