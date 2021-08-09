import { Component } from "solid-js";
import { Todo, useStore } from "./store";
import styles from "./TodoItem.module.css";

export const TodoItem: Component<Todo> = (props) => {
  const { toggleTodo } = useStore();

  const handleClick = () => {
    toggleTodo(props.id);
  };

  return (
    <li
      class={styles.item}
      classList={{ [styles.done]: props.done }}
      onClick={handleClick}
    >
      <span>#{props.id}:</span> {props.text}
    </li>
  );
};
