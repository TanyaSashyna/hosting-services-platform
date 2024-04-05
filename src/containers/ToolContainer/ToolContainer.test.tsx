/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "mobx-react";
import stores from "../../stores";

import { ToolContainer } from "./ToolContainer";
import ToolStoreMock from "../../__mocks__/ToolStoreMock";

afterEach(cleanup);

describe("ToolContainer", () => {
  it("renders by selected tab", () => {
    ToolStoreMock.getToolStatus = jest.fn().mockResolvedValue({});

    const { container, asFragment } = render(
      <Provider {...stores}>
        <ToolContainer id="id12345" toolStore={ToolStoreMock} />
      </Provider>
    );
    expect(container).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
