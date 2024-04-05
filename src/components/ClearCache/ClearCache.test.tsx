import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { ClearCache } from "./ClearCache";
import ToolStoreMock from "../../__mocks__/ToolStoreMock";

afterEach(cleanup);

describe("ClearCache", () => {
  it("renders ClearCache and matches snapshot", () => {
    const { container, getByText, asFragment } = render(
      <ClearCache
        domain="example.com"
        id="id12345"
        lastCacheClearedAt=""
        toolStore={ToolStoreMock}
      />
    );

    expect(container).toBeDefined();
    expect(getByText("Tools")).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders Last cleared", () => {
    const mockDate = "2023-10-23T09:47:31.472Z";
    const { container } = render(
      <ClearCache
        domain="example.com"
        id="id12345"
        lastCacheClearedAt={mockDate}
        toolStore={ToolStoreMock}
      />
    );

    expect(container.querySelector(".cardInfo__details")).toBeDefined();
  });

  it("ropen the ClearCacheModal", () => {
    const mockDate = "2023-10-23T09:47:31.472Z";
    const { getByText, getByTestId } = render(
      <ClearCache
        domain="example.com"
        id="id12345"
        lastCacheClearedAt={mockDate}
        toolStore={ToolStoreMock}
      />
    );

    const clearCacheBtn = getByTestId("clear-cache-btn");
    fireEvent.click(clearCacheBtn);

    expect(
      waitFor(() => expect(getByText("Clear all cache for example.com")))
    ).toBeDefined();
  });
});
