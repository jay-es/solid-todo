import type { Component } from "solid-js";
import styles from "./App.module.css";
import { TodoForm } from "./TodoForm";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <TodoForm />
    </div>
  );
};

export default App;
