import { inject, observer } from "mobx-react";
import React, { FC, useEffect, useState } from "react";
import { MessagePage, Link } from "@project-name-frontend/ui-package";
import {
  useNotifications,
  useLoadingPage,
  useAccountSwitcher,
  useNavigate,
} from "@project-name-frontend/shared-context";
import { ShellApi } from "@project-name-frontend/api-client";

import { ToolStore } from "../../stores/toolStore";
import {
  AddToolModal,
  CardTool,
  HintCardTool,
  CancelToolModal,
  DnsChangesModal,
  ToolNotificationBanner,
  InProgressModal,
  ClearCache,
} from "../../components";

type InjectedProps = {
  toolStore: ToolStore;
};

type ToolContainerProps = {
  id: string;
};

export const ToolContainer: FC<ToolContainerProps & InjectedProps> = ({
  id,
  toolStore,
}) => {
  const navigate = useNavigate();
  const { pushToast } = useNotifications();
  const { currentAccount } = useAccountSwitcher();
  const { pushLoading, popLoading, isLoading } = useLoadingPage();

  const [isCancelToolModal, setIsCancelToolModal] = useState<boolean>(false);
  const [isOpenAddToolModal, setIsOpenAddToolModal] = useState<boolean>(false);
  const [isDnsChangesModal, setIsDnsChangesModal] = useState<boolean>(false);
  const [isOpenSettingUpToolModal, setIsOpenSettingUpToolModal] =
    useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toolClearCacheEnabled, setToolClearCacheEnabled] =
    useState<boolean>(false);

  const { domain, status, dnsChangesRequired, dnsChanges, lastCacheClearedAt } =
    toolStore;

  const getStatus = (): void => {
    pushLoading();
    toolStore.getToolStatus(id).finally(popLoading);
  };

  useEffect(() => {
    if (currentAccount?.number) {
      pushLoading();
      ShellApi.checkFeatureAvailability(
        "clear-cache",
        currentAccount.number
      )
        .then((response) => {
          setToolClearCacheEnabled(response.enabled);
        })
        .finally(popLoading);
    }
  }, [currentAccount?.number]);

  useEffect(() => {
    if (!isLoading) {
      status === "error" ? setOpenErrorModal(true) : setOpenErrorModal(false);

      status === "inProgress" || status === "created"
        ? setIsOpenSettingUpToolModal(true)
        : setIsOpenSettingUpToolModal(false);
    }
  }, [status, isLoading]);

  const cancelTool = async (): Promise<void> => {
    try {
      setLoading(true);
      await toolStore.cancelTool(id);
      setIsCancelToolModal(false);
      setLoading(false);
      getStatus();
      pushToast({
        title: "Success",
        description: "Tool cancelled",
        intent: "positive",
      });
    } catch {
      setIsCancelToolModal(false);
      setLoading(false);
      pushToast({
        title: "Unable to cancel Tool",
        description: "Please try again in a few minutes.",
        intent: "negative",
      });
    }
  };

  const handleAddTool = async (): Promise<void> => {
    try {
      setIsOpenAddToolModal(false);
      setIsOpenSettingUpToolModal(true);
      await toolStore.addTool(id);
    } catch {
      setIsOpenAddToolModal(false);
      setIsOpenSettingUpToolModal(false);
      setOpenErrorModal(true);
      setIsError(true);
    }
  };

  return (
    <>
      <ToolNotificationBanner
        status={status}
        domain={domain}
        dnsChangesRequired={dnsChangesRequired}
        openDnsChangesModal={setIsDnsChangesModal}
      />
      <HintCardTool />
      {status === "enabled" && toolClearCacheEnabled && (
        <ClearCache
          domain={domain}
          lastCacheClearedAt={lastCacheClearedAt}
          id={id}
        />
      )}
      <CardTool
        setIsOpenAddToolModal={setIsOpenAddToolModal}
        setIsCancelToolModal={setIsCancelToolModal}
        domain={domain}
        role={currentAccount?.roles[0]}
        isError={isError}
        loading={loading}
        toolClearCacheEnabled={toolClearCacheEnabled}
      />
      <AddToolModal
        open={isOpenAddToolModal}
        onClose={setIsOpenAddToolModal}
        onAddTool={handleAddTool}
        domain={domain}
        loading={loading}
      />
      <CancelToolModal
        open={isCancelToolModal}
        onClose={setIsCancelToolModal}
        cancelTool={cancelTool}
        domain={domain}
        dnsChangesRequired={dnsChangesRequired}
        loading={loading}
      />
      <DnsChangesModal
        open={isDnsChangesModal}
        onClose={setIsDnsChangesModal}
        dnsChanges={dnsChanges}
        domain={domain}
      />
      <InProgressModal
        domain={domain}
        id={id}
        open={isOpenSettingUpToolModal}
        onClose={setIsOpenSettingUpToolModal}
      />
      <MessagePage
        isModal={true}
        intent="negative"
        title={`Tool setup for ${domain} failed`}
        isModalOpen={openErrorModal}
        icon="info_outline"
        body={
          <>
            Hmm... that’s odd. Please{" "}
            <Link href="mailto:support@project-name.com">contact us</Link> so we can
            look into this for you.
          </>
        }
        buttonsProps={[
          {
            text: "Close",
            onClick: (): void => {
              setOpenErrorModal(false);
              navigate(`/tool/overview/${id}`);
            },
          },
        ]}
      />
    </>
  );
};

ToolContainer.displayName = "ToolContainer";

export default inject("toolStore")(
  observer(ToolContainer)
) as unknown as FC<ToolContainerProps>;
