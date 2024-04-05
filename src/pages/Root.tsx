import React, { FC } from "react";
import {
  Routes,
  Route,
  SecuredRoute,
  Page,
  ErrorsProvider,
  useNavigate,
} from "@project-name-frontend/shared-context";

import ToolPage from "./ToolPage";

const Root: FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorsProvider>
      <Page
        layoutType="veryNarrow"
        title="Tool"
        backText="Back"
        onBack={(): void => {
          navigate(-1);
        }}
      >
        <Routes>
          <Route
            path="/tool/:id"
            element={
              <SecuredRoute>
                <ToolPage />
              </SecuredRoute>
            }
          />
        </Routes>
      </Page>
    </ErrorsProvider>
  );
};

Root.displayName = "Root";

export default Root;
