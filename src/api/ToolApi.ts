/* eslint-disable @typescript-eslint/no-explicit-any  */
import { get, post, remove } from "./requests";

export type StatusTool =
  | "inProgress"
  | "enabled"
  | "disabled"
  | "error"
  | "created";

export type DnsChangesType = {
  name: string;
  ttl: number;
  type: string;
  value: string;
};

export type ToolStatusType = {
  domain: string;
  status: StatusTool;
  dnsChangesRequired: boolean;
  dnsChanges: DnsChangesType[];
  hostReachable: boolean;
  canChangeDns: boolean;
  lastCacheClearedAt: string | null;
};

export class ToolApi {
  static getToolStatus(id: string): Promise<ToolStatusType> {
    return get<ToolStatusType>(`/api/tool/${id}`).then(
      (resp: ToolStatusType) => resp
    );
  }

  static addTool(id: string): Promise<any> {
    return post<any>(`/api/tool/${id}`).then(
      (resp: any) => resp
    );
  }

  static cancelTool(id: string): Promise<any> {
    return remove<any>(`/api/tool/${id}`).then(
      (resp: any) => resp
    );
  }

  static clearCache(id: string): Promise<any> {
    return post<any>(
      `/api/tool/${id}/clear_cache`
    ).then((resp: any) => resp);
  }
}
