import { Component } from "solid-js";
import { css } from "solid-styled-components";
import { Todo, toggleTodo } from "./store";

type Props = {
  todo: Todo;
};

export const TodoItem: Component<Props> = (props) => {
  const handleClick = () => {
    toggleTodo(props.todo.id);
  };

  return (
    <li
      class={style}
      classList={{ done: props.todo.done }}
      onClick={handleClick}
    >
      <span>#{props.todo.id}:</span> {props.todo.text}
    </li>
  );
};

const style = css`
  cursor: pointer;

  &.done {
    text-decoration: line-through;
  }

  > span {
    user-select: none;
  }
`;
