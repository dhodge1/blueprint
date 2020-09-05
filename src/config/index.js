import qa from "./qa";
import prod from "./prod";
import { getCurrentEnvironment } from "/utils/env";

const env = getCurrentEnvironment();

export const configurations = {
  qa,
  prod,
};

export default {
  ...configurations[env],
};
