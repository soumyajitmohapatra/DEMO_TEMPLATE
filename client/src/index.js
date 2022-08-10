import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

import { store } from "./store/index";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
