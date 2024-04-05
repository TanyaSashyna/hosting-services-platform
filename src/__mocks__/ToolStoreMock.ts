/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable @typescript-eslint/no-empty-function  */

import { ToolStore } from "../stores/ToolStore";
import { StatusTool, DnsChangesType } from "../api/ToolApi";

class ToolStoreMock extends ToolStore {
  getToolStatus(): any {}
  addTool(): any {}
  cancelTool(): any {}
  status: StatusTool = "disabled";
  domain = "";
  dnsChangesRequired = true;
  dnsChanges: DnsChangesType[] = [];
  percentage = 0;
  hostReachable = true;
}

const toolStoreMock = new ToolStoreMock();

toolStoreMock.getToolStatus = jest.fn();
toolStoreMock.addTool = jest.fn();
toolStoreMock.cancelTool = jest.fn();

export default toolStoreMock;
