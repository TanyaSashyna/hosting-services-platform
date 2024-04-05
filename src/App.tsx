import React, { FC } from "react";

import { Provider } from "mobx-react";

import Root from "./pages/Root";
import stores from "./stores";

const App: FC = () => (
  <Provider {...stores}>
    <Root />
  </Provider>
);

App.displayName = "toolFE";

export default App;
