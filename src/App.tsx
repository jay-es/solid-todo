import { batch, Component, For } from "solid-js";
import styles from "./App.module.css";
import { state, addTodo, toggleTodo } from "./store";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

const App: Component = () => {
  const totalCount = () => state.todos.length;
  const undoneCount = () => state.todos.filter((v) => !v.done).length;

  // リストが空の状態を確認するため、処理を遅らせる
  setTimeout(() => {
    if (totalCount()) return;

    batch(() => {
      addTodo("task1");
      addTodo("task2");
      addTodo("task3");
      toggleTodo(1);
    });
  }, 400);

  return (
    <div class={styles.App}>
      <TodoForm />
      <p>
        {totalCount} items ({undoneCount} undone)
      </p>
      <ul class={styles.list}>
        <For each={state.todos} fallback={<p>No Tasks</p>}>
          {(todo) => <TodoItem todo={todo} />}
        </For>
      </ul>
    </div>
  );
};

export default App;
