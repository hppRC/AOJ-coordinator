import React, { useRef } from 'react';
import { useFirestoreTodos } from 'src/hooks';
import { FirebaseAuthContainer } from 'src/store';
import { Todo } from 'types/models';

import styled from '@emotion/styled';

type Props = {
  todo: Todo;
  key: number;
  updateTodo: (
    uid: string,
    todoId: string,
    completed: boolean
  ) => Promise<void>;
  deleteTodo: (uid: string, todoId: string) => Promise<void>;
};

const TodoItem: React.FCX<Props> = ({
  className,
  todo,
  updateTodo,
  deleteTodo,
  key
}) => {
  const { user } = FirebaseAuthContainer.useContainer();
  if (!user) return <></>;
  const { id, text, completed } = todo;

  const handleUpdate = async () => {
    await updateTodo(user.uid, id, !completed);
  };

  const handleDelete = async () => {
    await deleteTodo(user.uid, id);
  };

  return (
    <ul key={key} className={className}>
      <li>{id}</li>
      <li>{text}</li>
      <li>
        <button onClick={handleUpdate}>
          {completed ? 'complete' : 'return to incomplete'}
        </button>
      </li>
      <li>
        <button onClick={handleDelete}>delete</button>
      </li>
    </ul>
  );
};

const StyledTodoItem = styled(TodoItem)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  list-style: none;
`;

const TodoContents: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();
  if (!user) return <></>;

  const { todos, addTodo, updateTodo, deleteTodo } = useFirestoreTodos(
    user.uid
  );
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    if (!ref.current) return;

    addTodo(user.uid, ref.current.value);
    ref.current.value = '';
  };

  return (
    <section className={className}>
      <form onSubmit={onSubmit}>
        <input type='text' ref={ref} />
        <button type='submit'>Add Todo</button>
      </form>
      {todos ? (
        todos?.map((todo, i) => (
          <StyledTodoItem
            todo={todo}
            key={i}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))
      ) : (
        <h1>now loading</h1>
      )}
    </section>
  );
};

export const StyledTodoContents = styled(TodoContents)`
  padding: 2rem 0;
  form {
    padding: 2rem 0;
    input {
      background-color: green;
    }
  }
`;

export default TodoContents;
