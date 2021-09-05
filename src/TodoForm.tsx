import { Component, createSignal, JSX } from "solid-js";
import { css } from "solid-styled-components";
import { todoStore } from "./store";

type ContainerProps = {};

type TemplateProps = ContainerProps & {
  handleSubmit: JSX.DOMAttributes<HTMLFormElement>["onSubmit"];
  handleTextInput: JSX.DOMAttributes<HTMLInputElement>["onInput"];
  textValue: string;
};

const Template: Component<TemplateProps> = (props) => (
  <form class={style} onSubmit={props.handleSubmit}>
    <input value={props.textValue} onInput={props.handleTextInput} />
    <button type="submit" disabled={!props.textValue}>
      add
    </button>
  </form>
);

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

    todoStore.add(text());
    setText("");
  };

  return (
    <Template
      {...props}
      handleSubmit={handleSubmit}
      handleTextInput={(ev) => setText(ev.currentTarget.value)}
      textValue={text()}
    />
  );
};

export const TodoForm = Container;
