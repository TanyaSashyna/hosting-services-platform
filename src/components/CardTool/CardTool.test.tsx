import React from "react";
import { cleanup, render, fireEvent, waitFor } from "@testing-library/react";

import { CardTool } from "./CardTool";
import ToolStoreMock from "../../__mocks__/ToolStoreMock";

afterEach(cleanup);

describe("CardTool", () => {
  const domainMock = "example.com";
  const mockFunc = jest.fn();

  it("renders CardTool and matches snapshot", () => {
    const { container, asFragment } = render(
      <CardTool
      setIsOpenAddToolModal={mockFunc}
      setIsCancelToolModal={mockFunc}
        domain={domainMock}
        toolStore={ToolStoreMock}
        loading={false}
        toolClearCacheEnabled={true}
      />
    );

    expect(container).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("trigger setIsOpenAddToolModal function on Add button click", () => {
    const { getByText, getByTestId } = render(
      <CardTool
        setIsOpenAddToolModal={mockFunc}
        setIsCancelToolModal={mockFunc}
        domain={domainMock}
        toolStore={ToolStoreMock}
        loading={false}
        toolClearCacheEnabled={true}
      />
    );

    const addBtn = getByTestId("add-btn");
    fireEvent.click(addBtn);

    expect(getByText("29 per month")).toBeDefined();
    expect(getByText("Add Tool to example.com")).toBeDefined();
    expect(
      getByText("Speed up content delivery on your website.")
    ).toBeDefined();
    expect(mockFunc).toHaveBeenCalled();
  });

  it("trigger setIsCancelToolModal function on Cancel button click", () => {
    ToolStoreMock.status = "enabled";

    const { getByText, getByTestId } = render(
      <CardTool
        setIsOpenAddToolModal={mockFunc}
        setIsCancelToolModal={mockFunc}
        domain={domainMock}
        toolStore={ToolStoreMock}
        loading={false}
        toolClearCacheEnabled={true}
      />
    );

    const cancelBtn = getByTestId("cancel-btn");
    fireEvent.click(cancelBtn);

    expect(getByText("Cancel Tool for example.com")).toBeDefined();
    expect(mockFunc).toHaveBeenCalled();
  });

  it("renders when toolClearCacheEnabled is false", () => {
    ToolStoreMock.status = "enabled";

    const { getByText } = render(
      <CardTool
        setIsOpenAddToolModal={mockFunc}
        setIsCancelToolModal={mockFunc}
        domain={domainMock}
        toolStore={ToolStoreMock}
        loading={false}
        toolClearCacheEnabled={false}
      />
    );

    expect(getByText("Edge cache")).toBeDefined();
  });

  it("renders when Cancel service button is disabled", () => {
    ToolStoreMock.status = "enabled";

    const { getByTestId } = render(
      <CardTool
        setIsOpenAddToolModal={mockFunc}
        setIsCancelToolModal={mockFunc}
        domain={domainMock}
        toolStore={ToolStoreMock}
        loading={true}
        toolClearCacheEnabled={true}
      />
    );

    const cancelBtn = getByTestId("cancel-btn");
    expect(cancelBtn).toHaveProperty("disabled", true);
  });

  it("renders when setting up Tool", () => {
    ToolStoreMock.status = "inProgress";

    const { getByTestId, getByText } = render(
      <CardTool
        setIsOpenAddToolModal={mockFunc}
        setIsCancelToolModal={mockFunc}
        domain={domainMock}
        toolStore={ToolStoreMock}
        loading={false}
        toolClearCacheEnabled={true}
      />
    );

    const addBtn = getByTestId("add-btn");
    fireEvent.mouseOver(addBtn);

    expect(waitFor(() => expect(getByText("Setting up Tool")))).toBeDefined();
  });

  it("renders when the role is a TechnAdmin and the status is disabled", () => {
    ToolStoreMock.status = "disabled";

    const { getByTestId, getByText } = render(
      <CardTool
        setIsOpenAddToolModal={mockFunc}
        setIsCancelToolModal={mockFunc}
        domain={domainMock}
        toolStore={ToolStoreMock}
        loading={false}
        toolClearCacheEnabled={true}
        role="TechnAdmin"
      />
    );

    const addBtn = getByTestId("add-btn");
    fireEvent.mouseOver(addBtn);

    expect(
      waitFor(() =>
        expect(getByText("You don't have the ability to activate Tool"))
      )
    ).toBeDefined();
  });

  it("renders when the role is a TechnAdmin and the status is enabled", () => {
    ToolStoreMock.status = "enabled";

    const { getByTestId, getByText } = render(
      <CardTool
        setIsOpenAddToolModal={mockFunc}
        setIsCancelToolModal={mockFunc}
        domain={domainMock}
        toolStore={ToolStoreMock}
        loading={false}
        toolClearCacheEnabled={true}
        role="TechnAdmin"
      />
    );

    const cancelBtn = getByTestId("cancel-btn");
    fireEvent.mouseOver(cancelBtn);

    expect(
      waitFor(() =>
        expect(getByText("You don't have the ability to cancel Tool"))
      )
    ).toBeDefined();
  });
});
