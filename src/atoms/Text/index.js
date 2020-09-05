import styled, { css } from 'styled-components';

const COMMON_STYLES = css`
  color: ${(p) => p.theme.colors[p.color] || p.theme.colors.black || 'black'};
  margin: ${(p) => p.theme.margin[p.margin] || p.theme.margin.none || '0'};
  padding: ${(p) => p.theme.padding[p.padding] || p.theme.padding.none || '0'};
  ${(p) => p.block && 'display: block;'}
  ${(p) => p.uppercase && 'text-transform: uppercase;'}
  ${(p) =>
    p.capitalize && 'text-transform: capitalize;'}
`;

export const Heading = styled.h1`
  ${COMMON_STYLES}
  font-family: ${(p) => p.theme.fontStyles.fontFamilies.primary};
  line-height: 1.14;

  font-weight: ${(p) =>
    p.theme.fontStyles.weights[p.weight] || p.theme.fontStyles.weights.normal};

  font-size: ${(p) =>
    p.theme.fontStyles.sizes[p.mobileSize] ||
    p.theme.fontStyles.sizes[p.size] ||
    p.theme.fontStyles.sizes.large};

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) =>
    p.theme.fontStyles.sizes[p.desktopSize] ||
      p.theme.fontStyles.sizes[p.size] ||
      p.theme.fontStyles.sizes.extraLarge};
  }
`;

Heading.displayName = 'Heading';

export const SubHeading = styled.h2`
  ${COMMON_STYLES}
  letter-spacing: 0.8px;
  font-family: ${(p) =>
    p.theme.fontStyles.fontFamilies[p.fontFamily] ||
    p.theme.fontStyles.fontFamilies.condensed};

  font-weight: ${(p) =>
    p.theme.fontStyles.weights[p.weight] || p.theme.fontStyles.weights.normal};

  line-height: ${(p) =>
    p.theme.fontStyles.lineHeight[p.lineHeightMobile] ||
    p.theme.fontStyles.lineHeight[p.lineHeight] ||
    1};

  font-size: ${(p) =>
    p.theme.fontStyles.sizes[p.mobileSize] ||
    p.theme.fontStyles.sizes[p.size] ||
    p.theme.fontStyles.sizes.medium};

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) =>
    p.theme.fontStyles.sizes[p.desktopSize] ||
      p.theme.fontStyles.sizes[p.size] ||
      p.theme.fontStyles.sizes.large};
    line-height: ${(p) =>
    p.theme.fontStyles.lineHeight[p.lineHeightDesktop] ||
      p.theme.fontStyles.lineHeight[p.lineHeight]};
  }
`;

SubHeading.displayName = 'SubHeading';

export const SectionHeading = styled.h3`
  ${COMMON_STYLES}
  font-family: ${(p) => p.theme.fontStyles.fontFamilies.condensed};
  font-size: ${(p) =>
    p.theme.fontStyles.sizes[p.size] || p.theme.fontStyles.sizes.medium};
  font-weight: ${(p) => p.theme.fontStyles.weights.bold};
  line-height: 1.11;
  letter-spacing: 1.8px;
  text-transform: uppercase;
`;

SectionHeading.displayName = 'SectionHeading';

export const SectionSubHeading = styled.h4`
  ${COMMON_STYLES}
  font-family: ${(p) =>
    p.theme.fontStyles.fontFamilies[p.fontFamily] ||
    p.theme.fontStyles.fontFamilies.primary};
  font-size: ${(p) =>
    p.theme.fontStyles.sizes[p.size] || p.theme.fontStyles.sizes.medium};
  font-weight: ${(p) => p.theme.fontStyles.weights.bold};
  line-height: 1.33;
  letter-spacing: "normal";
`;

SectionSubHeading.displayName = 'SectionSubHeading';

export const CardHeading = styled.h4`
  ${COMMON_STYLES}
  font-family: ${(p) => p.theme.fontStyles.fontFamilies.condensed};
  font-size: ${(p) =>
    p.theme.fontStyles.sizes[p.size] || p.theme.fontStyles.sizes.small};
  letter-spacing: ${(p) => p.theme.fontStyles.letterSpacing.extraSmall};
  font-weight: ${(p) => p.theme.fontStyles.weights.normal};
  line-height: 1;
`;

// this is to prevent linting errors
// (unexpected vendor-prefix "-webkit"  value-no-vendor-prefix)
const WEBKIT = '-webkit';

export const Truncate = styled.div`
  height: ${(p) => p.maxLines}em;
  overflow: hidden;

  /*
   * Truncation (-webkit-line-clamp) only works in combination with
   * the display property set to -webkit-box or -webkit-inline-box
   * and the -webkit-box-orient property set to vertical.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
   * https://caniuse.com/#search=line-clamp
   */
  display: ${WEBKIT}-box;
  ${WEBKIT}-line-clamp: ${(p) => p.maxLines};
  ${WEBKIT}-box-orient: vertical;
`;

CardHeading.displayName = 'CardHeading';

export const BodyText = styled.span`
  ${COMMON_STYLES}
  font-family: ${(p) =>
    p.theme.fontStyles.fontFamilies[p.fontFamily] ||
    p.theme.fontStyles.fontFamilies.primary};
  line-height: ${(p) => p.lineHeight || '1.33'};
  font-weight: ${(p) =>
    p.theme.fontStyles.weights[p.weight] ||
    (p.bold && p.theme.fontStyles.weights.bold) ||
    p.theme.fontStyles.weights.thin};
  letter-spacing: ${(p) =>
    p.theme.fontStyles.letterSpacing[p.letterSpacing] ||
    (p.bold && p.theme.fontStyles.letterSpacing.medium) ||
    'normal'};
  font-size: ${(p) =>
    p.theme.fontStyles.sizes[p.mobileSize] ||
    p.theme.fontStyles.sizes[p.size] ||
    p.theme.fontStyles.sizes.extraSmall};

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) =>
    p.theme.fontStyles.sizes[p.desktopSize] ||
      p.theme.fontStyles.sizes[p.size] ||
      p.theme.fontStyles.sizes.small};
  }
`;

BodyText.displayName = 'BodyText';

export const ButtonText = styled.span`
  ${COMMON_STYLES}
  font-family: ${(p) => p.theme.fontStyles.fontFamilies.condensed};
  font-size: ${(p) =>
    p.theme.fontStyles.sizes[p.size] || p.theme.fontStyles.sizes.tiny};
  font-weight: ${(p) => p.theme.fontStyles.weights.thin};
  letter-spacing: ${(p) => p.theme.fontStyles.letterSpacing.small};
  text-transform: uppercase;
  white-space: nowrap;
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    letter-spacing: ${(p) => p.theme.fontStyles.letterSpacing.large};
    font-weight: ${(p) => p.theme.fontStyles.weights.normal};
    font-size: ${(p) =>
    p.theme.fontStyles.sizes[p.desktopSize] ||
      p.theme.fontStyles.sizes[p.size] ||
      p.theme.fontStyles.sizes.small};
  }
`;

ButtonText.displayName = 'ButtonText';

export const QuoteText = styled.span`
  ${COMMON_STYLES}
  font-family: ${(p) => p.theme.fontStyles.fontFamilies.quote};
  font-size: ${(p) =>
    p.theme.fontStyles.sizes[p.size] || p.theme.fontStyles.sizes.medium};
  font-style: italic;
  letter-spacing: ${(p) =>
    p.theme.fontStyles.letterSpacing[p.letterSpacing] ||
    p.theme.fontStyles.letterSpacing.large};
`;

QuoteText.displayName = 'QuoteText';
