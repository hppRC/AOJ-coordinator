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
  readonly judgeId: number;
  readonly userId: string;
  readonly problemId: string;
  readonly language: string;
  readonly version: string;
  readonly submissionDate: number;
  readonly judgeDate: number;
  readonly cpuTime: number;
  readonly memory: number;
  readonly codeSize: number;
  readonly server: number;
  readonly policy: string;
  readonly rating: number;
  readonly review: number;
};
