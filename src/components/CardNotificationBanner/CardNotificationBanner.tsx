import React, { FC } from "react";
import { NotificationBanner, Link } from "@project-name-frontend/ui-package";

import { Container } from "./CardNotificationBanner.styles";

type CardNotificationBannerProps = {
  hostReachable: boolean;
  status: string;
  canChangeDns: boolean;
};

export const CardNotificationBanner: FC<CardNotificationBannerProps> = ({
  hostReachable,
  status,
  canChangeDns,
}) => {
  if (!hostReachable) {
    return (
      <Container>
        <NotificationBanner
          icon="warning"
          intent="warning"
          border={true}
          title="Warning"
          body={
            <>
              Unable to determine origin web server/web server IP. Please
              contact the Technical Support team at{" "}
              <Link href="mailto:support@project-name.com">support@project-name.com</Link>{" "}
              for assistance.
            </>
          }
        />
      </Container>
    );
  }

  if (!canChangeDns) {
    return (
      <Container>
        <NotificationBanner
          icon="warning"
          intent="warning"
          border={true}
          title="Warning"
          body={
            status === "enabled" ? (
              <>
                Your DNS records aren’t hosted by project-name. We highly recommend
                updating these to their pre-Tool configuration before
                cancellation.
              </>
            ) : (
              <>
                Once Tool setup is complete, please follow the instructions to
                update your DNS records and fully activate your service.
              </>
            )
          }
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <NotificationBanner
          icon="info"
          intent="neutral"
          border={true}
          title="Note"
          body={
            status === "enabled"
              ? "Cancelling Tool automatically reverts your DNS records to their pre-Tool configuration."
              : "Adding Tool to your domain automatically updates your DNS records to point to Tool."
          }
        />
      </Container>
    );
  }
};

CardNotificationBanner.displayName = "CardNotificationBanner";
