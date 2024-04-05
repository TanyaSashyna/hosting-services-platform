/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import Shell from "./Shell";

const container = document.getElementById("root");
const root = createRoot(container!);

const RunningApp =
  process.env.REACT_APP_EMULATION === "yes" ? Shell : App;

root.render(<RunningApp />);
