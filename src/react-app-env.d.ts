/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "*.svg" {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module "shell/Shell" {
  const Shell: any;
  export default Shell;
}
declare module "shell/Route" {
  const Route: any;
  export default Route;
}
declare module "shell/SecuredRoute" {
  const SecuredRoute: any;
  export default SecuredRoute;
}
