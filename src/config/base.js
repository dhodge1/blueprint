import getConfig from 'next/config';
import { titleCase } from '/utils/strings';

const { publicRuntimeConfig = null } = getConfig() || {};

const base = {
  endpoints: {
    restHost: 'api.digitalstudios.discovery.com',
    graphQLHost: 'api.foodnetwork.com'
  },
  classLandingPage: {
    id: '798516d1-ed4d-40aa-a8ad-c8d1f2246ce7',
    cardImageSize: 600,
    cardInstructorImageSize: 82
  },
  footer: {
    'AdChoices': 'http://info.evidon.com/pub_info/1212?v=1&nt=0&nw=false',
    'Privacy': 'https://corporate.discovery.com/privacy-policy/',
    'Visitor Agreement': 'https://kitchen.foodnetwork.com/#/visitor-agreement',
    'California Do Not Sell My Info': 'https://corporate.discovery.com/california_dns/',
    'Help': 'https://kitchenhelp.foodnetwork.com/hc/en-us'
  },
  header: {
    url: 'https://www.foodnetwork.com/content/food-com/en.syndicated_header_combined.html?bust=true',
    preloadedStyles: 'https://food.coreprod.fnr.sndimg.com/etc/clientlibs/assets/v2/css/food-syndicated-header-desktop.css'
  },
  sharingConstants: {
    facebookAppId: '582148248497951'
  },
  meta: {
    titles: {
      classLanding: 'Food Network Kitchen Classes',
      classSchedule: 'Food Network Kitchen Live Class Schedule',
      shoppingList: 'Food Network Kitchen Shopping List',
      topicsPage: 'Classes Food Network Kitchen'
    },
    descriptions: {
      classLanding: 'Cook alongside Food Network chefs and culinary experts with our extensive collection of live and on-demand cooking classes featuring FNK’s best recipes.',
      classSchedule: 'Check FNK’s live cooking class schedule frequently and never miss an interactive class with Food Network chefs and culinary experts.',
      shoppingList: 'Create shopping lists from your favorite Food Network recipes and get your ingredients delivered.',
      topicsPage: (topic, isChef) => {
        const actions = {
          grilling: 'grilling',
          cookout: 'having cookouts',
          'kid-friendly': 'cooking kid-friendly meals',
          vegetarian: 'cooking vegetarian meals',
        };
        let metaDescription = '';
        if (isChef && typeof topic === 'string') {
          let chefTopic = 'chefs and culinary experts';
          chefTopic = titleCase(topic);
          metaDescription = `“Take a class with Food Network Kitchen’s ${chefTopic}, and you’ll be cooking like a pro in no time.”`;
        } else {
          let action = actions[topic];
          if (!action) {
            action = `cooking ${topic}`;
          }
          metaDescription = `Class topic pages: Get started ${action} with a variety of step-by-step cooking classes taught by Food Network chefs and culinary experts.`;
        }
        return metaDescription;
      }
    }
  },
  url: {
    parent: 'https://www.foodnetwork.com'
  },
  upsell: 'https://kitchen.foodnetwork.com',
  freeTrialDuration: 30, // days
  apiRoutePath: '/api/fnk',
  publicFolderPath: publicRuntimeConfig ? publicRuntimeConfig.publicFolder : '',
  entitlementTokenCookiePath: '/'
};

base.endpoints.baseUrl = (graphql = true) => `https://${graphql ? base.endpoints.graphQLHost : base.endpoints.restHost}`;

export default base;
