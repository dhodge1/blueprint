import getConfig from 'next/config';

export const getCurrentEnvironment = (config = getConfig()) => {
  // let env = 'qa';
  // if (config?.publicRuntimeConfig?.TARGET_ENV) {
  //   env = config?.publicRuntimeConfig?.TARGET_ENV;
  // } else if (process?.env?.TARGET_ENV) {
  //   env = process?.env?.TARGET_ENV;
  // }

  const env = config?.publicRuntimeConfig?.TARGET_ENV ?? process?.env?.TARGET_ENV ?? 'qa';

  return env;
};