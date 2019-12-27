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

export type AOJUser = Partial<{
  id: string;
  name: string;
  affiliation: string;
  registerDate: number;
  lastSubmitDate: number;
  policy: string;
  country: string;
  birthYear: number;
  displayLanguage: string;
  defaultProgrammingLanguage: string;
  avatar: null;
  status: AOJUserStatus;
  url: string;
}>;

export type AOJUserStatus = Partial<{
  submissions: number;
  solved: number;
  accepted: number;
  wrongAnswer: number;
  timeLimit: number;
  memoryLimit: number;
  outputLimit: number;
  compileError: number;
  runtimeError: number;
}>;
