import React, { FC } from "react";
import { Modal, CardInfo, CopyToClipboard } from "@project-name-frontend/ui-package";

import { CardRow } from "./DnsChangesModal.styles";
import { DnsChangesType } from "../../api/ToolApi";

type DnsChangesModalProps = {
  open: boolean;
  onClose: (state: boolean) => void;
  dnsChanges: DnsChangesType[];
  domain: string;
};

export const DnsChangesModal: FC<DnsChangesModalProps> = ({
  open,
  onClose,
  dnsChanges,
  domain,
}) => {
  return (
    <Modal
      header="How to update your DNS records"
      hasCloseButton={true}
      open={open}
      onClose={(): void => onClose(false)}
    >
      <p>
        1. Log into the account where <b>{domain}</b>’s DNS records are
        currently hosted.
      </p>
      <p>
        2. Find your DNS settings and update to:
      </p>
      {dnsChanges.map((item) => {
        const value = `name: ${item.name}; ttl: ${item.ttl}; type: ${item.type}; value: ${item.value}`;

        return (
          <CardRow key={item.name} border={true} spacing="space-between">
            <CardInfo
              content={{
                children: (
                  <>
                    <div className="dns-info">
                      <b>name</b>: {item.name}
                    </div>
                    <div className="dns-info">
                      <b>ttl</b>: {item.ttl}
                    </div>
                    <div className="dns-info">
                      <b>type</b>: {item.type}
                    </div>
                    <div className="dns-info">
                      <b>value</b>: {item.value}
                    </div>
                  </>
                ),
              }}
            />
            <CardInfo
              align="right"
              action={{
                children: (
                  <CopyToClipboard
                    value={value}
                    tooltipProps={{ title: "Copy" }}
                  />
                ),
                hasIcon: true,
              }}
            />
          </CardRow>
        );
      })}
      <p>*DNS updates propagate within 24 hours.</p>
      <p>
        **Because your DNS records are not hosted by project-name, we can’t update
        them on your behalf.
      </p>
    </Modal>
  );
};

DnsChangesModal.displayName = "DnsChangesModal";
