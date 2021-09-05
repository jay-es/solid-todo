import { Component } from "solid-js";
import { css } from "solid-styled-components";
import { Todo, todoStore } from "./store";

type ContainerProps = {
  todo: Todo;
  enterEditable: () => void;
};

type Props = ContainerProps & {
  deleteTodo: () => void;
  toggleTodo: () => void;
};

const BaseComponent: Component<Props> = (props) => (
  <div class={style}>
    <label classList={{ done: props.todo.done }}>
      <input
        type="checkbox"
        checked={props.todo.done}
        onChange={props.toggleTodo}
      />
      <span>#{props.todo.id}:</span> {props.todo.text}
    </label>
    <button onClick={props.enterEditable}>edit</button>
    <button onClick={props.deleteTodo}>delete</button>
  </div>
);

const style = css`
  display: flex;
  align-items: flex-start;

  > .done {
    text-decoration: line-through;
  }

  > label {
    flex-grow: 1;
    word-break: break-all;
    cursor: pointer;
    user-select: none;
  }

  > button {
    margin-left: 0.5em;
  }
`;

const Container: Component<ContainerProps> = (props) => {
  const toggleTodo = () => {
    todoStore.toggle(props.todo.id);
  };
  const deleteTodo = () => {
    todoStore.delete(props.todo.id);
  };

  return (
    <BaseComponent {...props} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
  );
};

export const TodoItemDisplay = Container;
