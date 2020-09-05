import { CLASS_FIELDS } from '/data';

export const GET_LANDING_PAGE = `
  query GET_LANDING_PAGE(
    $id: ID!,
    $cardImageSize: Int,
    $cardInstructorImageSize: Int = 82
    ) {
    landingPage(id: $id) {
      blocks {
      ... on TopicsBlock   {
        title, size, kind, topicAssets
        topics {
          name, filters
          primaryImage {
            url
          }
        }
      }
      ... on TalentTopicsBlock {
          title, size, kind, topicAssets
          topics {
            name, filters
            primaryImage {
              url
            }
          }
        }
      ... on ProgrammableBlock   {
        title, size, kind, items {
          ...classFields
        }
      }
      ... on LiveClassesBlock   {
        title, size, kind, items (count: 7) {
          ...classFields
        }
      }
      ... on PreviouslyLiveBlock {
        title, size, kind, items {
          ...classFields
        }
      }
      ... on JumpBackInBlock {
        title, size, kind
      }
    }
    }
  }

  ${CLASS_FIELDS}
`;
