import React, { FC } from "react";
import { Modal, ButtonGroup, Button } from "@project-name-frontend/ui-package";

type ClearCacheModalProps = {
  domain: string;
  loading: boolean;
  open: boolean;
  onClose: (state: boolean) => void;
  handleClearCache: () => void;
};

export const ClearCacheModal: FC<ClearCacheModalProps> = ({
  domain,
  loading,
  open,
  onClose,
  handleClearCache,
}) => {
  const handleClose = (): void => {
    !loading && onClose(false);
  };

  return (
    <Modal
      header={`Clear all cache for ${domain}`}
      hasCloseButton={true}
      open={open}
      onClose={handleClose}
    >
      Clearing the entire cache will return your website to its pre-Tool
      installation speed until the cache rebuilds. This action cannot be
      reversed.
      <ButtonGroup bottomOfCard={true} layout="right">
        {!loading && (
          <Button buttonType="secondary" onClick={handleClose}>
            Cancel
          </Button>
        )}
        <Button onClick={handleClearCache} loading={loading} disabled={loading}>
          Clear all cache
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

ClearCacheModal.displayName = "ClearCacheModal";
