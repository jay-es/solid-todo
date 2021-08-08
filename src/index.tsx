import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { StoreProvider } from "./store";

const root = document.getElementById("root");

if (!root) throw new Error("no root");

render(
  () => (
    <StoreProvider>
      <App />
    </StoreProvider>
  ),
  root
);
