import React, { FC } from "react";
import { Modal, ButtonGroup, Button } from "@project-name-frontend/ui-package";

type CancelToolModalProps = {
  domain: string;
  dnsChangesRequired: boolean;
  open: boolean;
  loading: boolean;
  onClose: (state: boolean) => void;
  cancelTool: () => void;
};

export const CancelToolModal: FC<CancelToolModalProps> = ({
  domain,
  dnsChangesRequired,
  open,
  loading,
  onClose,
  cancelTool,
}) => {
  const handleClose = (): void => {
    !loading && onClose(false);
  };

  return (
    <Modal
      header={`Cancel Tool for ${domain}`}
      hasCloseButton={true}
      open={open}
      onClose={handleClose}
    >
      {dnsChangesRequired ? (
        <>
          If you haven’t updated your DNS records to point away from Tool, your
          website may experience <b>performance disruptions.</b>
        </>
      ) : (
        <>
          Cancelling Tool automatically reverts your DNS records back to their
          pre-Tool configuration within 24 hours.
        </>
      )}
      <ButtonGroup bottomOfCard={true} layout="right">
        {!loading && (
          <Button buttonType="secondary" onClick={handleClose}>
            Keep Tool
          </Button>
        )}
        <Button onClick={cancelTool} disabled={loading} loading={loading}>
          Cancel Tool
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

CancelToolModal.displayName = "CancelToolModal";
