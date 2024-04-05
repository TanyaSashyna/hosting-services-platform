import React, { FC } from "react";
import { Modal, ButtonGroup, Button } from "@project-name-frontend/ui-package";

type AddToolModalProps = {
  domain: string;
  open: boolean;
  loading: boolean;
  onClose: (state: boolean) => void;
  onAddTool: () => void;
};

export const AddToolModal: FC<AddToolModalProps> = ({
  domain,
  open,
  loading,
  onClose,
  onAddTool,
}) => {
  const handleClose = (): void => {
    !loading && onClose(false);
  };

  return (
    <Modal
      header={`Add Tool to ${domain}`}
      hasCloseButton={true}
      open={open}
      onClose={handleClose}
    >
      By adding Tool, you agree to be billed <strong>29 per month</strong>.
      <ButtonGroup bottomOfCard={true} layout="right">
        {!loading && (
          <Button buttonType="secondary" onClick={handleClose}>
            Cancel
          </Button>
        )}
        <Button onClick={onAddTool} loading={loading} disabled={loading}>
          Add
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

AddToolModal.displayName = "AddToolModal";
