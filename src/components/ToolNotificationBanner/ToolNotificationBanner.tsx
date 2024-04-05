import React, { FC, useState, useEffect } from "react";
import { NotificationBanner, Link } from "@project-name-frontend/ui-package";

import { StatusTool } from "../../api/ToolApi";

type ToolNotificationBannerProps = {
  status: StatusTool;
  domain: string;
  dnsChangesRequired: boolean;
  openDnsChangesModal: (state: boolean) => void;
};

export const ToolNotificationBanner: FC<ToolNotificationBannerProps> = ({
  status,
  domain,
  dnsChangesRequired,
  openDnsChangesModal,
}) => {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    if (!dnsChangesRequired && status === "enabled") {
      setShowBanner(true);
    }
  }, [dnsChangesRequired, status]);

  if (status === "enabled" && dnsChangesRequired) {
    return (
      <NotificationBanner
        icon="warning"
        intent="warning"
        title="Warning"
        body={
          <>
            Tool setup is complete, however, you need to{" "}
            <Link onClick={(): void => openDnsChangesModal(true)}>
              update your DNS records
            </Link>{" "}
            to fully activate your service. You’ll still be billed for Tool while
            DNS changes are pending.
          </>
        }
      />
    );
  }

  if (showBanner) {
    return (
      <NotificationBanner
        icon="check_circle"
        intent="positive"
        title={`Tool is active on ${domain}`}
        body="Your website’s DNS is now pointing to Tool."
        onClose={(): void => setShowBanner(false)}
      />
    );
  }

  return null;
};

ToolNotificationBanner.displayName = "ToolNotificationBanner";
