import base from '/config/base';
import merge from 'lodash/merge';

let qa = {
  playerUrls: {
    hostname: 'https://dtc-webplayer-qa.s3.amazonaws.com',
    get videoStylesheet() {
      return `${this.hostname}/player/style.css`;
    },
    get videoScript() {
      return `${this.hostname}/player/main.bundle.js`;
    }
  },
  scripts: {
    adobedtm: '//assets.adobedtm.com/e090d2ba2d7e/dd2bd5146431/launch-8e5f32fe27b9-development.min.js'
  },
  endpoints: {
    accessToken: {
      env: '-qa',
      get uri() {
        return `/kitchen${this.env}/v1/access-token`;
      },
    },
    graphql: {
      env: '-qa',
      get uri() {
        return `/kitchen${this.env}/v1/graphql`;
      }
    },
    entitlements: {
      env: '-qa',
      get uri() {
        return `/subscriptions${this.env}/v1/entitlements/web`;
      }
    }
  },
  newRelic: {
    loaderConfig: {
      accountID: '685766',
      agentID: '536895170',
      applicationID: '536895170',
      licenseKey: '4ec229a14a',
    },
    info: {
      applicationID: '536895170',
      licenseKey: '4ec229a14a'
    }
  },
  ads: {
    dpfEnvironment: 'staging'
  }
};

export default merge({}, base, qa);
