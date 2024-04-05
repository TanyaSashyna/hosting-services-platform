import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { Page } from "@project-name-frontend/ui-package";
import { AddToolModal } from "./AddToolModal";

afterEach(cleanup);

describe("DnsChangesModal", () => {
  const mockFunc = jest.fn();

  it("renders DnsChangesModal and matches snapshot", () => {
    const { container, asFragment } = render(
      <Page>
        <AddToolModal
          open={true}
          onClose={mockFunc}
          onAddTool={mockFunc}
          domain="example.com"
          loading={false}
        />
      </Page>
    );
    expect(container).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("trigger onClose function on Cancel button click", () => {
    const { getByText } = render(
      <Page>
        <AddToolModal
          open={true}
          onClose={mockFunc}
          onAddTool={mockFunc}
          domain="example.com"
          loading={false}
        />
      </Page>
    );
    const cancelBtn = getByText("Cancel");
    fireEvent.click(cancelBtn);

    expect(mockFunc).toHaveBeenCalled();
  });

  it("trigger onAddTool function on Add button click", () => {
    const { getByText } = render(
      <Page>
        <AddToolModal
          open={true}
          onClose={mockFunc}
          onAddTool={mockFunc}
          domain="example.com"
          loading={false}
        />
      </Page>
    );
    const addBtn = getByText("Add");
    fireEvent.click(addBtn);

    expect(mockFunc).toHaveBeenCalled();
  });

  it("doesn't render Cancel button when loading is true", () => {
    const { container, getByText } = render(
      <Page>
        <AddToolModal
          open={true}
          onClose={mockFunc}
          onAddTool={mockFunc}
          domain="example.com"
          loading={true}
        />
      </Page>
    );

    expect(container.querySelector(".loader")).toBeDefined();
    expect(() => getByText("Cancel")).toThrow("Unable to find an element");
  });
});
