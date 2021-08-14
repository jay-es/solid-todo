import { Component, createSignal } from "solid-js";
import { addTodo } from "./store";

export const TodoForm: Component = () => {
  const [text, setText] = createSignal("");

  const handleSubmit = () => {
    if (!text()) return;

    addTodo(text());
    setText("");
  };

  return (
    <form onClick={handleSubmit}>
      <input value={text()} onInput={(e) => setText(e.currentTarget.value)} />
      <button type="submit" disabled={!text()}>
        add
      </button>
    </form>
  );
};
