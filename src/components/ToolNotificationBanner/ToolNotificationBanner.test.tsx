import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { ToolNotificationBanner } from "./ToolNotificationBanner";

afterEach(cleanup);

describe("ToolNotificationBanner", () => {
  const mockFunc = jest.fn();

  it("renders ToolNotificationBanner and matches snapshot", () => {
    const { container, asFragment } = render(
      <ToolNotificationBanner
        status="enabled"
        domain="example.com"
        dnsChangesRequired={false}
        openDnsChangesModal={mockFunc}
      />
    );

    expect(container).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders when the status is enabled and open is true", () => {
    const { getByText } = render(
      <ToolNotificationBanner
        status="enabled"
        domain="example.com"
        dnsChangesRequired={false}
        openDnsChangesModal={mockFunc}
      />
    );

    expect(getByText("Tool is active on example.com")).toBeDefined();
  });

  it("close a Notification Banner", () => {
    const { getByText } = render(
      <ToolNotificationBanner
        status="enabled"
        domain="example.com"
        dnsChangesRequired={false}
        openDnsChangesModal={mockFunc}
      />
    );

    const closeBtn = getByText("close");
    fireEvent.click(closeBtn);

    expect(() => getByText("Tool is active on example.com")).toThrow(
      "Unable to find an element"
    );
  });

  it("renders when the status and dnsChangesRequired is true", () => {
    const { getByText } = render(
      <ToolNotificationBanner
        status="enabled"
        domain="example.com"
        dnsChangesRequired={true}
        openDnsChangesModal={mockFunc}
      />
    );

    expect(getByText("Warning")).toBeDefined();
  });

  it("trigger openDnsChangesModal function on DNS changes button click", () => {
    const { getByText } = render(
      <ToolNotificationBanner
        status="enabled"
        domain="example.com"
        dnsChangesRequired={true}
        openDnsChangesModal={mockFunc}
      />
    );

    const dnsChangesBtn = getByText("update your DNS records");
    fireEvent.click(dnsChangesBtn);

    expect(mockFunc).toHaveBeenCalled();
  });
});
