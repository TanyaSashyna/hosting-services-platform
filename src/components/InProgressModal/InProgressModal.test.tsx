import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { Page } from "@project-name-frontend/ui-package";
import { InProgressModal } from "./InProgressModal";

afterEach(cleanup);

describe("InProgressModal", () => {
  const mockFunc = jest.fn();

  it("renders InProgressModal and matches snapshot", () => {
    const { container, getByText, asFragment } = render(
      <Page>
        <InProgressModal
          open={true}
          onClose={mockFunc}
          domain="example.com"
          id="id12345"
        />
      </Page>
    );
    expect(container).toBeDefined();
    expect(getByText("Setting up Tool on example.com")).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("trigger onClose function on Close button click", () => {
    const { getByText } = render(
      <Page>
        <InProgressModal
          open={true}
          onClose={mockFunc}
          domain="example.com"
          id="id12345"
        />
      </Page>
    );
    const closeBtn = getByText("Close");
    fireEvent.click(closeBtn);

    expect(mockFunc).toHaveBeenCalled();
  });

  it("close the InProgressModal", () => {
    const { container } = render(
      <Page>
        <InProgressModal
          open={true}
          onClose={mockFunc}
          domain="example.com"
          id="id12345"
        />
      </Page>
    );
    const closeBtn = container.querySelector(
      ".MuiIconButton-sizeSmall"
    ) as Element;
    fireEvent.click(closeBtn);

    expect(container).toBeDefined();
  });
});
