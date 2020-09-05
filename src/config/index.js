import qa from '/config/qa';
import prod from '/config/prod';
import { getCurrentEnvironment } from '/utils/env';

const env = getCurrentEnvironment();

export const configurations = {
  qa,
  prod,
};

export default {
  ...configurations[env],
};
