import { ArrayFilterFn, createStore } from "solid-js/store";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

let todoId = 0;
const [state, setState] = createStore<{ todos: Todo[] }>({ todos: [] });

export { state };

export const addTodo = (text: string) => {
  setState("todos", (todos) => [...todos, { id: ++todoId, text, done: false }]);
};

export const deleteTodo = (id: number) => {
  setState("todos", (todos) => todos.filter((v) => v.id !== id));
};

export const toggleTodo = (id: number) => {
  setState(
    "todos",
    ((todo) => todo.id === id) as ArrayFilterFn<Todo[]>,
    "done",
    (done) => !done
  );
};
