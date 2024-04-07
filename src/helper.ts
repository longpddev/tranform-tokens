import {registerTransforms} from '@tokens-studio/sd-transforms';
import lodash from 'lodash';
const { once } = lodash;

export const registerTransformsOnce = once(registerTransforms)

export function normalizeFileExtension<T extends string>(extensionName: string): T {
  if(!extensionName) return '' as T
  extensionName = extensionName.trim().toLowerCase();
  if(extensionName.startsWith('.')) extensionName = extensionName.slice(1);
  extensionName = extensionName.trim();
  return extensionName as T
}