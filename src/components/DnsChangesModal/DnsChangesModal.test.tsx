import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { Page } from "@project-name-frontend/ui-package";
import { DnsChangesModal } from "./DnsChangesModal";

afterEach(cleanup);

describe("DnsChangesModal", () => {
  const mockFunc = jest.fn();
  const dnsChangesMock = [
    {
      name: "@",
      ttl: 600,
      type: "type",
      value: "DNS record info",
    },
  ];

  it("renders DnsChangesModal", () => {
    const { container, getByText } = render(
      <Page>
        <DnsChangesModal
          open={true}
          onClose={mockFunc}
          dnsChanges={dnsChangesMock}
          domain="example.com"
        />
      </Page>
    );
    expect(container).toBeDefined();
    expect(getByText("How to update your DNS records")).toBeDefined();
  });

  it("renders dnsChanges", () => {
    const { getByText } = render(
      <Page>
        <DnsChangesModal
          open={true}
          onClose={mockFunc}
          dnsChanges={dnsChangesMock}
          domain="example.com"
        />
      </Page>
    );
    expect(getByText(": @")).toBeDefined();
  });

  it("trigger onClose function on close button click", () => {
    const { container } = render(
      <Page>
        <DnsChangesModal
          open={true}
          onClose={mockFunc}
          dnsChanges={dnsChangesMock}
          domain="example.com"
        />
      </Page>
    );
    const closeBtn = container.querySelector(
      ".MuiIconButton-root"
    ) as HTMLElement;
    fireEvent.click(closeBtn);

    expect(mockFunc).toHaveBeenCalled();
  });

  it("matches snapshot", () => {
    const { container, asFragment } = render(
      <Page>
        <DnsChangesModal
          open={true}
          onClose={mockFunc}
          dnsChanges={dnsChangesMock}
          domain="example.com"
        />
      </Page>
    );
    expect(container).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
