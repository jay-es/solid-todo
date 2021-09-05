import { Component, createSignal, JSX } from "solid-js";
import { css } from "solid-styled-components";
import { Todo, todoStore } from "./store";

type ContainerProps = {
  todo: Todo;
  exitEditable: () => void;
};

type Props = ContainerProps & {
  text: string;
  onInputText: JSX.DOMAttributes<HTMLInputElement>["onInput"];
  submit: () => void;
};

const BaseComponent: Component<Props> = (props) => (
  <div class={style}>
    <input value={props.text} onInput={props.onInputText} />
    <button onClick={props.submit} disabled={!props.text}>
      ok
    </button>
    <button onClick={props.exitEditable}>cancel</button>
  </div>
);

const style = css`
  display: flex;
  align-items: flex-start;

  > input {
    flex-grow: 1;
  }

  > button {
    margin-left: 0.5em;
  }
`;

const Container: Component<ContainerProps> = (props) => {
  const [text, setText] = createSignal(props.todo.text);

  const onInputText: Props["onInputText"] = (ev) => {
    setText(ev.currentTarget.value);
  };

  const submit = () => {
    todoStore.edit(props.todo.id, text());
    setText("");
    props.exitEditable();
  };

  return (
    <BaseComponent
      {...props}
      text={text()}
      onInputText={onInputText}
      submit={submit}
    />
  );
};

export const TodoItemEdit = Container;
