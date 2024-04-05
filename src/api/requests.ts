import * as utils from "@project-name-frontend/utils";
import {
  authHttpCallWrapper,
  errorsHttpCallWrapper,
} from "@project-name-frontend/shared-context";

export const get = errorsHttpCallWrapper(authHttpCallWrapper(utils.get));
export const post = errorsHttpCallWrapper(authHttpCallWrapper(utils.post));
export const put = errorsHttpCallWrapper(authHttpCallWrapper(utils.put));
export const remove = errorsHttpCallWrapper(authHttpCallWrapper(utils.remove));
