import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { Page } from "@project-name-frontend/ui-package";
import { CancelToolModal } from "./CancelToolModal";

afterEach(cleanup);

describe("CancelToolModal", () => {
  const mockFunc = jest.fn();

  it("renders CancelToolModal and matches snapshot", () => {
    const { container, asFragment } = render(
      <Page>
        <CancelToolModal
          open={true}
          onClose={mockFunc}
          cancelTool={mockFunc}
          domain="example.com"
          dnsChangesRequired={false}
          loading={false}
        />
      </Page>
    );
    expect(container).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders when dnsChangesRequired is true", () => {
    const { getByText } = render(
      <Page>
        <CancelToolModal
          open={true}
          onClose={mockFunc}
          cancelTool={mockFunc}
          domain="example.com"
          dnsChangesRequired={true}
          loading={false}
        />
      </Page>
    );
    expect(
      getByText(
        "If you haven’t updated your DNS records to point away from Tool, your website may experience"
      )
    ).toBeDefined();
  });

  it("renders when dnsChangesRequired is false", () => {
    const { getByText } = render(
      <Page>
        <CancelToolModal
          open={true}
          onClose={mockFunc}
          cancelTool={mockFunc}
          domain="example.com"
          dnsChangesRequired={false}
          loading={false}
        />
      </Page>
    );
    expect(
      getByText(
        "Cancelling Tool automatically reverts your DNS records back to their pre-Tool configuration within 24 hours."
      )
    ).toBeDefined();
  });

  it("trigger onClose function on Keep Tool button click", () => {
    const { getByText } = render(
      <Page>
        <CancelToolModal
          open={true}
          onClose={mockFunc}
          cancelTool={mockFunc}
          domain="example.com"
          dnsChangesRequired={false}
          loading={false}
        />
      </Page>
    );
    const keepBtn = getByText("Keep Tool");
    fireEvent.click(keepBtn);

    expect(mockFunc).toHaveBeenCalled();
  });

  it("trigger cancelTool function on Cancel Tool button click", () => {
    const { getByText } = render(
      <Page>
        <CancelToolModal
          open={true}
          onClose={mockFunc}
          cancelTool={mockFunc}
          domain="example.com"
          dnsChangesRequired={false}
          loading={false}
        />
      </Page>
    );
    const cancelBtn = getByText("Cancel Tool");
    fireEvent.click(cancelBtn);

    expect(mockFunc).toHaveBeenCalled();
  });

  it("doesn't render Cancel button when loading is true", () => {
    const { container, getByText } = render(
      <Page>
        <CancelToolModal
          open={true}
          onClose={mockFunc}
          cancelTool={mockFunc}
          domain="example.com"
          dnsChangesRequired={false}
          loading={true}
        />
      </Page>
    );

    expect(container.querySelector(".loader")).toBeDefined();
    expect(() => getByText("Cancel")).toThrow("Unable to find an element");
  });
});
