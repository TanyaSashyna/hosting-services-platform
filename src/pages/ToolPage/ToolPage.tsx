import { inject, observer } from "mobx-react";
import React, { FC, useEffect } from "react";
import {
  Page,
  useWindowTitle,
  useLoadingPage,
  useNavigate,
  useParams,
} from "@project-name-frontend/shared-context";

import { ToolStore } from "../../stores/toolStore";
import ToolContainer from "../../containers/ToolContainer";

type InjectedProps = {
  toolStore: ToolStore;
};

export const ToolPage: FC<InjectedProps> = ({ toolStore }) => {
  useWindowTitle("Tool");
  const navigate = useNavigate();
  const { id } = useParams();
  const { pushLoading, popLoading } = useLoadingPage();

  useEffect(() => {
    if (id) {
      pushLoading();
      toolStore.getToolStatus(id).finally(popLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const { domain } = toolStore;

  return (
    <Page
      layoutType="veryNarrow"
      title="Tool"
      subTitle={domain}
      onBack={(): void =>
        navigate(`/tool/overview/${id}`)
      }
      backText="Back"
    >
      {domain && (
        <ToolContainer id={id as string} />
      )}
    </Page>
  );
};

ToolPage.displayName = "ToolPage";

export default inject("toolStore")(observer(ToolPage)) as unknown as FC;
