/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import type { Configuration, ProxyList } from "@project-name-frontend/cli";
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

export const proxyList: ProxyList = {
  "/api": "https://....",
  "/module-federations": "https://....",
  "/shell/": "https://....",
};

const dependencies = {
  react: { singleton: true },
  "react-dom": { singleton: true },
  "react-router-dom": { singleton: true },
  "styled-components": { singleton: true },
  "@project-name-frontend/utils": { singleton: true },
  "@project-name-frontend/ui-package": { singleton: true },
  "@project-name-frontend/api-client": { singleton: true },
  "@project-name-frontend/shared-context": { singleton: true },
};

export const webpackDevConfig: Configuration = {
  plugins: [
    new ModuleFederationPlugin({
      // TODO: update tool name
      name: "toolFE",
      filename: "remoteEntry.js",
      remotes: {
        shell: `shell@${process.env.REMOTE_ENTRY}`,
      },
      exposes: {
        "./App": "./src/App",
      },
      shared: dependencies,
    }),
  ],
};

export const webpackProdConfig: Configuration = {
  plugins: [
    new ModuleFederationPlugin({
      // TODO: update tool name
      name: "toolFE",
      filename: "remoteEntry.js",
      remotes: {
        shell: `shell@${process.env.REMOTE_ENTRY}`,
      },
      exposes: {
        "./App": "./src/App",
      },
      shared: dependencies,
    }),
  ],
};
