import { Component, createContext, useContext } from "solid-js";
import { ArrayFilterFn, createStore } from "solid-js/store";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoStore = {
  state: { todos: Todo[] };
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
};

const StoreContext = createContext<TodoStore>({
  state: { todos: [] },
  addTodo: () => {},
  toggleTodo: () => {},
});

export const StoreProvider: Component = (props) => {
  let todoId = 0;
  const [state, setState] = createStore(StoreContext.defaultValue.state);

  const store = {
    state,
    addTodo(text: string) {
      setState("todos", (todos) => [
        ...todos,
        { id: ++todoId, text, done: false },
      ]);
    },
    toggleTodo(id: number) {
      setState(
        "todos",
        ((todo) => todo.id === id) as ArrayFilterFn<Todo[]>,
        "done",
        (done) => !done
      );
    },
  };

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
