import { get } from "./requests";

export interface UserRole {
  resource: string;
  role: string;
}

export class UserRoleApi {
  static async get(): Promise<UserRole> {
    const res = await get<UserRole>("/auth/1.0.0/resources");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (res as any)[0];
  }
}
