import { Component } from "solid-js";
import { css } from "solid-styled-components";
import type { Todo } from "./store";
import { todoStore } from "./store";

type ContainerProps = {
  todo: Todo;
};

type Props = ContainerProps & {
  deleteTodo: () => void;
  toggleTodo: () => void;
};

const BaseComponent: Component<Props> = (props) => (
  <li class={style}>
    <label classList={{ done: props.todo.done }}>
      <input
        type="checkbox"
        checked={props.todo.done}
        onchange={props.toggleTodo}
      />
      <span>#{props.todo.id}:</span> {props.todo.text}
    </label>
    <button onclick={props.deleteTodo}>delete</button>
  </li>
);

const style = css`
  > .done {
    text-decoration: line-through;
  }

  > label {
    display: inline-block;
    width: 16em;
    text-align: left;
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

export const TodoItem = Container;
