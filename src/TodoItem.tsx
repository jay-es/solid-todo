import { Component, createSignal } from "solid-js";
import { css } from "solid-styled-components";
import type { Todo } from "./store";
import { TodoItemDisplay } from "./TodoItemDisplay";
import { TodoItemEdit } from "./TodoItemEdit";

type ContainerProps = {
  todo: Todo;
};

type Props = ContainerProps & {
  editable: boolean;
  enterEditable: () => void;
  exitEditable: () => void;
};

const BaseComponent: Component<Props> = (props) => (
  <li class={style}>
    {props.editable ? (
      <TodoItemEdit {...props} />
    ) : (
      <TodoItemDisplay {...props} />
    )}
  </li>
);

const style = css`
  margin-bottom: 0.5em;
`;

const Container: Component<ContainerProps> = (props) => {
  const [editable, setEditable] = createSignal(false);

  return (
    <BaseComponent
      {...props}
      editable={editable()}
      enterEditable={setEditable.bind(null, true)}
      exitEditable={setEditable.bind(null, false)}
    />
  );
};

export const TodoItem = Container;
