import React, { FC } from "react";
import { useNavigate } from "@project-name-frontend/shared-context";
import { Modal, ButtonGroup, Button } from "@project-name-frontend/ui-package";

type InProgressModalProps = {
  domain: string;
  id: string;
  open: boolean;
  onClose: (state: boolean) => void;
};

export const InProgressModal: FC<InProgressModalProps> = ({
  domain,
  id,
  open,
  onClose,
}) => {
  const navigate = useNavigate();
  const handleClose = (): void => {
    onClose(false);
  };

  return (
    <Modal
      header={`Setting up Tool on ${domain}`}
      hasCloseButton={true}
      open={open}
      onClose={handleClose}
    >
      Closing this window won’t affect setup, which takes up to 20 minutes. To
      check on progress, select Tool under Domain Tools.
      <ButtonGroup bottomOfCard={true} layout="right">
        <Button
          onClick={(): void => {
            onClose(false);
            navigate(`/tool/overview/${id}`);
          }}
        >
          Close
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

InProgressModal.displayName = "InProgressModal";
