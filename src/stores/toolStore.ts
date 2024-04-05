import { observable } from "mobx";

import { ToolApi, StatusTool, DnsChangesType } from "../api/ToolApi";

export class ToolStore {
  @observable domain = "";
  @observable status: StatusTool = "disabled";
  @observable dnsChangesRequired = false;
  @observable dnsChanges: DnsChangesType[] = [];
  @observable hostReachable = false;
  @observable canChangeDns = true;
  @observable lastCacheClearedAt = "";

  async getToolStatus(id: string): Promise<void> {
    this.domain = "";
    this.status = "disabled";
    const data = await ToolApi.getToolStatus(id);
    this.status = data.status;
    this.canChangeDns = data.canChangeDns;
    this.dnsChangesRequired = data.dnsChangesRequired;
    this.dnsChanges = data.dnsChanges;
    this.hostReachable = data.hostReachable;
    this.domain = data.domain;
    this.lastCacheClearedAt = data.lastCacheClearedAt || "";
  }

  async addTool(id: string): Promise<void> {
    this.status = "inProgress";
    await ToolApi.addTool(id);
  }

  async cancelTool(id: string): Promise<void> {
    await ToolApi.cancelTool(id);
    this.status = "disabled";
  }

  async clearCache(id: string): Promise<void> {
    const data = await ToolApi.clearCache(id);
    this.lastCacheClearedAt = data.lastCacheClearedAt;
  }
}

const store = new ToolStore();
export default store;
