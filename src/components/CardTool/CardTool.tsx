import { inject, observer } from "mobx-react";
import React, { FC } from "react";
import {
  CardRow,
  CardInfo,
  useMobile,
  Button,
  Tooltip,
} from "@project-name-frontend/ui-package";

import { Card } from "./CardTool.styles";
import { CardNotificationBanner } from "../CardNotificationBanner";
import { ToolStore } from "../../stores/toolStore";

type InjectedProps = {
  toolStore: ToolStore;
};

type CardToolProps = {
  domain: string;
  role?: string;
  isError?: boolean;
  loading: boolean;
  toolClearCacheEnabled: boolean;
  setIsOpenAddToolModal: (state: boolean) => void;
  setIsCancelToolModal: (state: boolean) => void;
};

export const CardTool: FC<CardToolProps & InjectedProps> = ({
  toolStore,
  domain,
  role,
  isError,
  loading,
  toolClearCacheEnabled,
  setIsOpenAddToolModal,
  setIsCancelToolModal,
}) => {
  const { mobile } = useMobile();
  const { status, hostReachable, canChangeDns } = toolStore;
  const enabled = status === "enabled";
  const inProgressStatus = status === "inProgress" || status === "created";

  return (
    <>
      <Card
        header={
          enabled ? (
            `Cancel Tool for ${domain}`
          ) : (
            <div>
              {`Add Tool to ${domain}`}
              <div>29 per month</div>
            </div>
          )
        }
        noPad={true}
      >
        <CardRow
          direction={mobile ? "column" : "row"}
          spacing="space-between"
          className={!mobile ? "card-align" : ""}
        >
          <CardInfo
            content={{
              children: enabled
                ? "Tool optimises website performance and speed."
                : "Speed up content delivery on your website.",
            }}
          />
          <CardInfo
            align={mobile ? "center" : "right"}
            action={{
              fullWidth: true,
              children: enabled ? (
                <Tooltip
                  placement="top"
                  title={
                    role === "TechnAdmin"
                      ? "You don't have the ability to cancel Tool"
                      : ""
                  }
                >
                  <Button
                    fullWidth={mobile}
                    buttonType="secondary"
                    onClick={(): void => setIsCancelToolModal(true)}
                    data-testid="cancel-btn"
                    disabled={loading || role === "TechnAdmin"}
                  >
                    Cancel service
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip
                  placement="top"
                  title={
                    !isError && inProgressStatus
                      ? "Setting up Tool"
                      : role === "TechnAdmin"
                      ? "You don't have the ability to activate Tool"
                      : ""
                  }
                >
                  <Button
                    fullWidth={mobile}
                    leftIcon="add"
                    disabled={
                      !hostReachable ||
                      (!isError && inProgressStatus) ||
                      role === "TechnAdmin"
                    }
                    onClick={(): void => setIsOpenAddToolModal(true)}
                    data-testid="add-btn"
                  >
                    Add
                  </Button>
                </Tooltip>
              ),
            }}
          />
        </CardRow>
        <CardNotificationBanner
          hostReachable={hostReachable}
          status={status}
          canChangeDns={canChangeDns}
        />
      </Card>
      {enabled && !toolClearCacheEnabled && (
        <Card
          header="Edge cache"
          subtitle="Determines how long content stays in the cache."
          noPad={true}
        >
          <CardRow>
            <CardInfo
              header={{
                children: (
                  <>
                    1 hour
                    <span className="thin-text">{" (default)"}</span>
                  </>
                ),
              }}
            />
          </CardRow>
        </Card>
      )}
    </>
  );
};

CardTool.displayName = "CardTool";

export default inject("toolStore")(
  observer(CardTool)
) as unknown as FC<CardToolProps>;
