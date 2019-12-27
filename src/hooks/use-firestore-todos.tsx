import 'firebase/firestore';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { Todo } from 'types/models';

export const todosCollection = (uid: string) =>
  firebase
    .firestore()
    .collection(`users`)
    .doc(uid)
    .collection(`todos`);

const toModel = (id: string, data: firebase.firestore.DocumentData) => {
  const { text, completed } = data;
  const createdAt = data.createdAt
    ? data.createdAt.toDate().getTime()
    : undefined;
  const updatedAt = data.updatedAt
    ? data.updatedAt.toDate().getTime()
    : undefined;
  return {
    id,
    text,
    completed,
    createdAt,
    updatedAt
  };
};

export const useFirestoreTodos = (uid: string) => {
  const [todos, setTodos] = useState<Todo[]>();
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    const collection = todosCollection(uid);

    const query: firebase.firestore.Query = collection.orderBy(
      `createdAt`,
      `desc`
    );

    const unsubscribe = query.onSnapshot(snapshot => {
      const todos = snapshot.docs.map(doc => toModel(doc.id, doc.data()));
      console.log(todos);
      setTodos(todos);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addTodo = async (uid: string, todoName: string) => {
    if (!todoName.trim()) return;

    await todosCollection(uid)
      .add({
        text: todoName,
        completed: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(error => {
        setError(error);
        console.error('Error add todo to Firebase Database', error);
      });

    const newTodos = todos?.filter(({ id }) => id !== todoName);
    setTodos(newTodos);

    return;
  };

  const updateTodo = async (
    uid: string,
    todoId: string,
    completed: boolean
  ) => {
    await todosCollection(uid)
      .doc(todoId)
      .update({
        completed,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(error => {
        setError(error);
        console.error('Error update todo to Firebase Database', error);
      });
    return;
  };

  const deleteTodo = async (uid: string, todoId: string) => {
    await todosCollection(uid)
      .doc(todoId)
      .delete()
      .catch(error => {
        console.error('Error delete todo to Firebase Database', error);
      });
    return;
  };

  return { todos, error, addTodo, updateTodo, deleteTodo };
};

export default useFirestoreTodos;
