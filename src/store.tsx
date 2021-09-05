import { ArrayFilterFn, createStore } from "solid-js/store";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

let todoId = 0;
const [state, setState] = createStore<{ todos: Todo[] }>({ todos: [] });

export const todoStore = {
  state,
  add: (text: string) => {
    setState("todos", (todos) => [
      ...todos,
      { id: ++todoId, text, done: false },
    ]);
  },
  delete: (id: number) => {
    setState("todos", (todos) => todos.filter((v) => v.id !== id));
  },
  toggle: (id: number) => {
    setState(
      "todos",
      ((todo) => todo.id === id) as ArrayFilterFn<Todo[]>,
      "done",
      (done) => !done
    );
  },
};
