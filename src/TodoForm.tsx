import { Component, createSignal } from "solid-js";
import { css } from "solid-styled-components";
import { addTodo } from "./store";

export const TodoForm: Component = () => {
  const [text, setText] = createSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!text()) return;

    addTodo(text());
    setText("");
  };

  return (
    <form class={style} onSubmit={handleSubmit}>
      <input value={text()} onInput={(e) => setText(e.currentTarget.value)} />
      <button type="submit" disabled={!text()}>
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
