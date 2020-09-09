import { CLASS_FIELDS } from "/data";

export const GET_LANDING_PAGE = `
  query GET_LANDING_PAGE(
    $id: ID!,
    $cardImageSize: Int,
    $cardInstructorImageSize: Int = 82
    ) {
    landingPage(id: $id) {
      blocks {
      ... on TopicsBlock   {
        __typename, title, size, kind, topicAssets
        topics {
          name, filters
          primaryImage {
            url
          }
        }
      }
      ... on TalentTopicsBlock {
        __typename, title, size, kind, topicAssets
          topics {
            name, filters
            primaryImage {
              url
            }
          }
        }
      ... on ProgrammableBlock   {
        __typename, title, size, kind, items {
          ...classFields
        }
      }
      ... on LiveClassesBlock   {
        __typename, title, size, kind, items (count: 7) {
          ...classFields
        }
      }
      ... on PreviouslyLiveBlock {
        __typename, title, size, kind, items {
          ...classFields
        }
      }
      ... on JumpBackInBlock {
        __typename, title, size, kind
      }
    }
    }
  }

  ${CLASS_FIELDS}
`;

export const GET_ALL_TOPICS = `
  query GET_ALL_TOPICS(
    $id: ID!,
    ) {
    landingPage(id: $id) {
      blocks {
       ... on TopicsBlock {
        __typename
         topics {
           name, filters
         }
       }
       ... on TalentTopicsBlock {
        __typename, title, size, kind, topicAssets
          topics {
            name, filters
            primaryImage {
              url
            }
          }
        }
     }
    }
  }
`;

export const GET_TOPIC_RESULTS = `
  query GET_TOPIC_RESULTS(
      $filters: [String],
      $cardImageSize: Int,
      $cardInstructorImageSize: Int = 82
      $next: String = "0"
    ) {
    search(filters: $filters, searchType: Class, paging: { next: $next, limit: 24 }) {
      total
      paging {
        next
        limit
      }
      items {
        ... on Class {
          ...classFields
        }
      }
    }
  }

  ${CLASS_FIELDS}
`;
