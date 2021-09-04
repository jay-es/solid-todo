import { Component, createSignal, JSX } from "solid-js";
import { css } from "solid-styled-components";
import { addTodo } from "./store";

type ContainerProps = {};

type Props = ContainerProps & {
  handleSubmit: JSX.DOMAttributes<HTMLFormElement>["onSubmit"];
  handleTextInput: JSX.DOMAttributes<HTMLInputElement>["onInput"];
  textValue: string;
};

const BaseComponent: Component<Props> = (props) => {
  return (
    <form class={style} onSubmit={props.handleSubmit}>
      <input value={props.textValue} onInput={props.handleTextInput} />
      <button type="submit" disabled={!props.textValue}>
        add
      </button>
    </form>
  );
};

const style = css`
  margin: 1rem;

  > button {
    margin-left: 0.5em;
  }
`;

const Container: Component<ContainerProps> = (props) => {
  const [text, setText] = createSignal("");

  const handleSubmit = (ev: Event) => {
    ev.preventDefault();
    if (!text()) return;

    addTodo(text());
    setText("");
  };

  return (
    <BaseComponent
      {...props}
      handleSubmit={handleSubmit}
      handleTextInput={(ev) => setText(ev.currentTarget.value)}
      textValue={text()}
    />
  );
};

export const TodoForm = Container;
