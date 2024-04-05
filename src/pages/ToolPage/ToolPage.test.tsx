import React from "react";
import { cleanup, render, fireEvent, waitFor } from "@testing-library/react";
import { Page } from "@project-name-frontend/ui-package";
import { Provider } from "mobx-react";
import { ToolPage } from "./ToolPage";
import ToolStoreMock from "../../__mocks__/ToolStoreMock";
import stores from "../../stores";

const mockedUsedNavigate = jest.fn();

jest.mock("@project-name-frontend/shared-context", () => ({
  ...jest.requireActual("@project-name-frontend/shared-context"),
  useNavigate: (): unknown => mockedUsedNavigate,
}));

afterEach(cleanup);

describe("ToolPage", () => {
  it("renders and matches snapshot", () => {
    ToolStoreMock.getToolStatus = jest.fn().mockResolvedValue({});

    const { container, asFragment } = render(
      <ToolPage toolStore={ToolStoreMock} />
    );
    expect(container).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("triggers getToolStatus", () => {
    ToolStoreMock.getToolStatus = jest.fn();

    const { container } = render(<ToolPage toolStore={ToolStoreMock} />);

    waitFor(() => expect(ToolStoreMock.getToolStatus).toHaveBeenCalled());
    expect(container).toBeDefined();
  });

  it("triggers onBack", () => {
    ToolStoreMock.getToolStatus = jest.fn().mockResolvedValue({});
    ToolStoreMock.domain = "example.com";

    const { container } = render(
      <Provider {...stores}>
        <Page
          baseHeader="Tool"
          onBack={(): void => mockedUsedNavigate("/tool/overview/1")}
          backText={<button className="header__back">Back</button>}
        >
          <ToolPage toolStore={ToolStoreMock} />
        </Page>
      </Provider>
    );

    const backBtn = container.querySelector(".header__back") as Element;
    fireEvent.click(backBtn);

    expect(mockedUsedNavigate).toHaveBeenCalled();
  });
});
