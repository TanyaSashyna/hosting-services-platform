import styled from "styled-components";
import { CardRow as _CardRow } from "@project-name-frontend/ui-package";

export const CardRow = styled(_CardRow)`
  .cardInfo:first-child {
    padding-left: 0;
  }
  .cardInfo:last-child {
    padding-right: 0;
  }
  .cardInfo__content {
    flex-direction: column;
  }
  .dns-info {
    word-break: break-all;
  }
`;
