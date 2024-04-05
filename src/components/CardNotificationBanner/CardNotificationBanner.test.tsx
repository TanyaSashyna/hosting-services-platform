import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";

import { CardNotificationBanner } from "./CardNotificationBanner";

afterEach(cleanup);

describe("CardNotificationBanner", () => {
  it("renders CardNotificationBanner and matches snapshot", () => {
    const { container, getByText, asFragment } = render(
      <CardNotificationBanner
        hostReachable={false}
        canChangeDns={true}
        status="enabled"
      />
    );

    expect(container).toBeDefined();
    expect(
      waitFor(() =>
        expect(
          getByText(
            "Cancelling Tool automatically reverts your DNS records to their pre-Tool configuration."
          )
        )
      )
    ).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders when status prop is disabled", () => {
    const { getByText } = render(
      <CardNotificationBanner
        hostReachable={true}
        canChangeDns={true}
        status="disabled"
      />
    );

    expect(
      waitFor(() =>
        expect(
          getByText(
            "Adding Tool to your domain automatically updates your DNS records to point to Tool."
          )
        )
      )
    ).toBeDefined();
  });

  it("renders when status is enabled and canChangeDns props is true", () => {
    const { getByText } = render(
      <CardNotificationBanner
        hostReachable={true}
        canChangeDns={false}
        status="enabled"
      />
    );

    expect(
      waitFor(() =>
        expect(
          getByText(
            "Your DNS records aren’t hosted by project-name. We highly recommend updating these to their pre-Tool configuration before cancellation."
          )
        )
      )
    ).toBeDefined();
  });

  it("renders when status is disabled and canChangeDns is true", () => {
    const { getByText } = render(
      <CardNotificationBanner
        hostReachable={true}
        canChangeDns={false}
        status="disabled"
      />
    );

    expect(
      waitFor(() =>
        expect(
          getByText(
            "Once Tool setup is complete, please follow the instructions to update your DNS records and fully activate your service."
          )
        )
      )
    ).toBeDefined();
  });

  it("renders when hostReachable prop is false", () => {
    const { getByText } = render(
      <CardNotificationBanner
        hostReachable={false}
        canChangeDns={true}
        status="disabled"
      />
    );

    expect(getByText("support@project-name.com")).toBeDefined();
  });
});
