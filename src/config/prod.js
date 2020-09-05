import base from '/config/base';
import merge from 'lodash/merge';

let prod = {
  playerUrls: {
    hostname: 'https://d1ujyvr8zweuwo.cloudfront.net',
    get videoStylesheet() {
      return `${this.hostname}/1/dtc-player.css`;
    },
    get videoScript() {
      return `${this.hostname}/1/dtc-player.js`;
    },
  },
  scripts: {
    adobedtm:
      '//assets.adobedtm.com/e090d2ba2d7e/dd2bd5146431/launch-b735a0b484c2.min.js',
  },
  endpoints: {
    accessToken: {
      env: '',
      get uri() {
        return `/kitchen${this.env}/v1/access-token`;
      },
    },
    graphql: {
      env: '',
      get uri() {
        return `/kitchen${this.env}/v1/graphql`;
      },
    },
    entitlements: {
      env: '',
      get uri() {
        return `/subscriptions${this.env}/v1/entitlements/web`;
      },
    },
  },
  newRelic: {
    loaderConfig: {
      accountID: '649847',
      agentID: '536891158',
      applicationID: '536891158',
      licenseKey: '7a7e439890',
    },
    info: {
      applicationID: '536891158',
      licenseKey: '7a7e439890',
    },
  },
  ads: {
    dpfEnvironment: 'production',
  },
};

export default merge({}, base, prod);
