import { batch, Component, For } from "solid-js";
import styles from "./App.module.css";
import { todoStore } from "./store";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

const App: Component = () => {
  const totalCount = () => todoStore.state.todos.length;
  const undoneCount = () => todoStore.state.todos.filter((v) => !v.done).length;

  // リストが空の状態を確認するため、処理を遅らせる
  setTimeout(() => {
    if (totalCount()) return;

    batch(() => {
      todoStore.add("task1");
      todoStore.add("task2");
      todoStore.add("task3");
      todoStore.toggle(1);
    });
  }, 400);

  return (
    <div class={styles.App}>
      <TodoForm />
      <p>
        {totalCount} items ({undoneCount} undone)
      </p>
      <ul class={styles.list}>
        <For each={todoStore.state.todos} fallback={<p>No Tasks</p>}>
          {(todo) => <TodoItem todo={todo} />}
        </For>
      </ul>
    </div>
  );
};

export default App;
