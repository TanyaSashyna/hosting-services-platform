import styled from "styled-components";
import { Card as _Card, breakpoints } from "@project-name-frontend/ui-package";

export const Card = styled(_Card)`
  .indent-bottom {
    @media (max-width: ${breakpoints.phoneUpperBoundary}) {
      padding-bottom: 0;
    }
  }
`;
