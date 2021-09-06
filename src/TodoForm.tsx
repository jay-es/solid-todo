import { Component, createSignal, JSX } from "solid-js";
import { css } from "solid-styled-components";
import { todoStore } from "./store";

type ContainerProps = {};

type TemplateProps = ContainerProps & {
  text: string;
  onInputText: JSX.DOMAttributes<HTMLInputElement>["onInput"];
  onSubmit: JSX.DOMAttributes<HTMLFormElement>["onSubmit"];
};

const Template: Component<TemplateProps> = (props) => (
  <form class={style} onSubmit={props.onSubmit}>
    <input value={props.text} onInput={props.onInputText} />
    <button type="submit" disabled={!props.text}>
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

  const onInputText: TemplateProps["onInputText"] = (ev) => {
    setText(ev.currentTarget.value);
  };

  const onSubmit: TemplateProps["onSubmit"] = (ev) => {
    ev.preventDefault();
    if (!text()) return;

    todoStore.add(text());
    setText("");
  };

  return (
    <Template
      {...props}
      text={text()}
      onInputText={onInputText}
      onSubmit={onSubmit}
    />
  );
};

export const TodoForm = Container;
