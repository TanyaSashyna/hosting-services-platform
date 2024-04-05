## About

Template of standalone React application based on (create-react-app).
A small part of code from a large project as an example of work.

## Dependencies

1. `@project-name-frontend/shared-context` - a custom package with utils and hooks
2. `@project-name-frontend/ui-package` - a custom package with ui components based on the Material UI
3. `@project-name-frontend/utils` - a custom package with utils and validations
4. `@project-name-frontend/api-client` - a package with additional API requests
5. `"@project-name-frontend/cli"` - package with configuration

## Installation

1. Clone the repository.
2. Remove `.git`.
3. Perform `yarn install`.

## Scripts

* `yarn start` - to run local server
* `yarn build:dev` - to build development version
* `yarn build:main` - to build production version
* `yarn test` - run jest test environment
* `yarn coverage` - run test and coverage once
* `yarn lint` - run eslint
* `yarn prettier` - run prettier
* `yarn make` - to generate components

## Architecture
### File structure

* api - api calls
* common - utils
* components - components
* containers - containers
* pages - main pages
* store - storages

### File structure naming convention

* files folders - camelCase
* page component folder - camelCase
* single component folder - camelCase
* single component - camelCase
* single component test - camelCase.test.*
* single endpoint file - camelCase.ts
* other TSX files - camelCase

### Components types

* Component - basic component. It can have internal state (useState).

* Container - basic component. It can have internal state. It uses shared store.

* Page - main component. Main responsibility of this component is layout rendering based on route path. It can have it own state and use shared logic.

* Root.tsx - main application wrapper and router.

## Styled components

Example of usage ui-package variables in styled-components
```typescript
import styled from "styled-components";

import { Card as _Card, breakpoints, colors } from "@project-name-frontend/ui-package";

export const Card = styled(_Card)`
  display: flex;
  color: ${colors.fontColor};
  @media (max-width: ${breakpoints.phone}) {
    display: block;
  }
`;
```
