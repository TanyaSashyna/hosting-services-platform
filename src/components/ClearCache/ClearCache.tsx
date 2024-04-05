import { inject, observer } from "mobx-react";
import React, { FC, useState } from "react";
import { CardRow, CardInfo, useMobile, Button } from "@project-name-frontend/ui-package";
import { useNotifications } from "@project-name-frontend/shared-context";

import { Card } from "./ClearCache.styles";
import { ClearCacheModal } from "../ClearCacheModal";
import { ToolStore } from "../../stores/toolStore";
import { getDateFormat } from "../../common/utils";

type InjectedProps = {
  toolStore: ToolStore;
};

type ClearCacheProps = {
  domain: string;
  lastCacheClearedAt: string;
  id: string;
};

export const ClearCache: FC<ClearCacheProps & InjectedProps> = ({
  domain,
  lastCacheClearedAt,
  id,
  toolStore,
}) => {
  const { mobile } = useMobile();
  const { pushToast } = useNotifications();
  const [openClearCacheModal, setOpenClearCacheModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClearCache = async (): Promise<void> => {
    setLoading(true);
    await toolStore
      .clearCache(id)
      .then(() => {
        pushToast({
          title: "Cache cleared",
          description:
            "Visitors should see the most up-to-date content on your site.",
          intent: "positive",
        });
      })
      .catch(() => {
        pushToast({
          title: "Unable to clear cache",
          description: "Please try again.",
          intent: "negative",
        });
      })
      .finally(() => {
        setLoading(false);
        setOpenClearCacheModal(false);
      });
  };

  return (
    <>
      <Card header="Tools" noPad={true}>
        <CardRow border={true}>
          <CardInfo
            content={{
              children: (
                <div>
                  <strong>Edge cache</strong> dictates the duration for
                  which content remains stored in the cache. By default, this
                  period is set to one hour.
                </div>
              ),
            }}
          />
        </CardRow>
        <CardRow
          border={true}
          direction={mobile ? "column" : "row"}
          spacing="space-between"
          align={mobile ? "" : "center"}
        >
          <CardInfo
            header={{
              children: "Clear all cache",
            }}
            content={{
              children:
                "Clearing the entire cache will ensure that your website's visitors experience the most up-to-date version of your site.",
            }}
            details={
              lastCacheClearedAt &&
              `Last cleared: ${getDateFormat(lastCacheClearedAt)}`
            }
            className={mobile ? "indent-bottom" : ""}
          />
          <CardInfo
            align={mobile ? "center" : "right"}
            action={{
              fullWidth: true,
              children: (
                <Button
                  fullWidth={mobile}
                  onClick={(): void => {
                    setOpenClearCacheModal(true);
                  }}
                  data-testid="clear-cache-btn"
                >
                  Clear all cache
                </Button>
              ),
            }}
          />
        </CardRow>
      </Card>
      <ClearCacheModal
        domain={domain}
        loading={loading}
        open={openClearCacheModal}
        onClose={setOpenClearCacheModal}
        handleClearCache={handleClearCache}
      />
    </>
  );
};

ClearCache.displayName = "ClearCache";

export default inject("toolStore")(
  observer(ClearCache)
) as unknown as FC<ClearCacheProps>;
