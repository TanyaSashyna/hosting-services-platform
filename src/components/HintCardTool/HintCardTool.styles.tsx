import styled from "styled-components";
import {
  ButtonGroup as _ButtonGroup,
  paddings,
  breakpoints,
} from "@project-name-frontend/ui-package";

export const ButtonGroup = styled(_ButtonGroup)`
  .hint-btn {
    @media (max-width: ${breakpoints.phoneUpperBoundary}) {
      .button__internal {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
`;

export const TextWrap = styled("div")`
  margin-bottom: ${paddings.default};
`;
