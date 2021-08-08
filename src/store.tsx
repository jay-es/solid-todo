import { Component, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoStore = {
  state: { todos: Todo[] };
  addTodo: (text: string) => void;
};

const StoreContext = createContext<TodoStore>({
  state: { todos: [] },
  addTodo: () => {},
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
  };

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
