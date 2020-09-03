export const CLASS_FIELDS = `
  fragment classFields on Class {
    id, title, startTime, duration, difficulty, type, percentLikes, tier
    primaryImage {
      url(transform: {
        width: $cardImageSize
      })
    }
    instructors {
      title
      primaryImage {
        url(transform: {
          width: $cardInstructorImageSize
        })
      }
    }
    publishingConfig {
      web {
        url
        seo {
          title
          slug
        }
      }
    }
  }
`;