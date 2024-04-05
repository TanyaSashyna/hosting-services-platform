import styled from "styled-components";
import {
  Card as _Card,
  breakpoints,
  fontWeight,
} from "@project-name-frontend/ui-package";

export const Card = styled(_Card)`
  .cardInfo:first-child {
    @media (max-width: ${breakpoints.phoneUpperBoundary}) {
      padding-bottom: 0;
    }
  }

  .card-align {
    align-items: center;
  }

  .thin-text {
    font-weight: ${fontWeight.regular};
  }
`;
