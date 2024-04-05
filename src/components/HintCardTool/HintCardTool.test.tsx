import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { HintCardTool } from "./HintCardTool";

afterEach(cleanup);

describe("HintCardList", () => {
  it("renders HintCardList", () => {
    const { container, getByText } = render(<HintCardTool />);
    expect(container).toBeDefined();
    expect(getByText("About Tool")).toBeDefined();
  });

  it("renders when HintCardList is open", () => {
    const { getByText } = render(<HintCardTool />);

    const btn = getByText("About Tool");
    fireEvent.click(btn);

    expect(getByText("What is Tool?")).toBeDefined();
  });

  it("renders when HintCardList is open", () => {
    const { getByText } = render(<HintCardTool />);

    const btn = getByText("About Tool");
    fireEvent.click(btn);

    const closeBtn = getByText("close");
    fireEvent.click(closeBtn);

    expect(() => getByText("What is Tool?")).toThrow(
      "Unable to find an element"
    );
  });

  it("matches snapshot", () => {
    const { container, asFragment } = render(<HintCardTool />);
    expect(container).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
