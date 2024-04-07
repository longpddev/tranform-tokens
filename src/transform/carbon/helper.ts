import {TransformedToken} from "style-dictionary/types";

export function getCarbonTokenName(token: TransformedToken) {
  return token.path[token.path.length - 1];
}