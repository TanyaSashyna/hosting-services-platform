import "shell/styles";

import React, { FC } from "react";

import Route from "shell/Route";
import Shell from "shell/Shell";

import InnerApp from "./App";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).__XCP_SHELL_DISABLE_TOOL__ = true;

const App: FC = () => (
  <Shell>
    <Route path={["/tool/:id"]} component={InnerApp} />
  </Shell>
);

App.displayName = "toolFE";

export default App;
