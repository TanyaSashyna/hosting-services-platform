import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { Page } from "@project-name-frontend/ui-package";
import { ClearCacheModal } from "./ClearCacheModal";

afterEach(cleanup);

describe("ClearCacheModal", () => {
  const mockFunc = jest.fn();

  it("renders ClearCacheModal and matches snapshot", () => {
    const { container, getByText, asFragment } = render(
      <Page>
        <ClearCacheModal
          domain="example.com"
          loading={false}
          open={true}
          onClose={mockFunc}
          handleClearCache={mockFunc}
        />
      </Page>
    );

    expect(container).toBeDefined();
    expect(getByText("Clear all cache for example.com")).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("trigger onClose function on Cancel button click", () => {
    const { getByText } = render(
      <Page>
        <ClearCacheModal
          domain="example.com"
          loading={false}
          open={true}
          onClose={mockFunc}
          handleClearCache={mockFunc}
        />
      </Page>
    );
    const cancelBtn = getByText("Cancel");
    fireEvent.click(cancelBtn);

    expect(mockFunc).toHaveBeenCalled();
  });

  it("trigger handleClearCache function on Clear all cache button click", () => {
    const { getByText } = render(
      <Page>
        <ClearCacheModal
          domain="example.com"
          loading={false}
          open={true}
          onClose={mockFunc}
          handleClearCache={mockFunc}
        />
      </Page>
    );
    const button = getByText("Clear all cache");
    fireEvent.click(button);

    expect(mockFunc).toHaveBeenCalled();
  });

  it("doesn't render Cancel button when loading is true", () => {
    const { container, getByText } = render(
      <Page>
        <ClearCacheModal
          domain="example.com"
          loading={true}
          open={true}
          onClose={mockFunc}
          handleClearCache={mockFunc}
        />
      </Page>
    );

    expect(container.querySelector(".loader")).toBeDefined();
    expect(() => getByText("Cancel")).toThrow("Unable to find an element");
  });
});
