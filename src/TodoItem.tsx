import { Component, JSX } from "solid-js";
import { css } from "solid-styled-components";
import { Todo, toggleTodo } from "./store";

type ContainerProps = {
  todo: Todo;
};

type Props = ContainerProps & {
  handleClick: JSX.DOMAttributes<HTMLLIElement>["onClick"];
};

const BaseComponent: Component<Props> = (props) => (
  <li
    class={style}
    classList={{ done: props.todo.done }}
    onClick={props.handleClick}
  >
    <span>#{props.todo.id}:</span> {props.todo.text}
  </li>
);

const style = css`
  cursor: pointer;

  &.done {
    text-decoration: line-through;
  }

  > span {
    user-select: none;
  }
`;

const Container: Component<ContainerProps> = (props) => {
  const handleClick = () => {
    toggleTodo(props.todo.id);
  };

  return <BaseComponent {...props} handleClick={handleClick} />;
};

export const TodoItem = Container;
