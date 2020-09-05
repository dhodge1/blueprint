import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Link from "next/link";
import { Image, Heading, BodyText, ButtonText } from "/atoms";
import config from "@config";

const LandingHeader = ({
  className,
  pageType,
  isEntitled,
  hasLogo = true,
  hasBackArrow = false,
  backRoute = "/kitchen/classes",
  mobileSize = "extraLarge",
  desktopSize = "XXL",
}) => {
  return (
    <Wrapper className={className}>
      <HeaderMain isEntitled={isEntitled}>
        <TitleBlock>
          {hasBackArrow && (
            <Link href={backRoute} passHref>
              <BackArrow>
                <StyledBodyText mobileSize={"tiny"} desktopSize={"extraSmall"}>
                  ⟵ Back
                </StyledBodyText>
              </BackArrow>
            </Link>
          )}
          <Heading
            weight={"semiBold"}
            mobileSize={mobileSize}
            desktopSize={desktopSize}
          >
            {pageType}
          </Heading>
        </TitleBlock>
        {hasLogo && (
          <PremiumLogo>
            <FNKLogo src={`${config.publicFolderPath}/FNKLogo.svg`} />
            <StyledButtonText>Premium</StyledButtonText>
          </PremiumLogo>
        )}
      </HeaderMain>
    </Wrapper>
  );
};

LandingHeader.displayName = "LandingHeader";

const fontSizes = [
  "tiny",
  "extraSmall",
  "small",
  "medium",
  "mediumLarge",
  "large",
  "XL",
  "extraLarge",
  "XXL",
];

LandingHeader.propTypes = {
  className: PropTypes.string,
  isEntitled: PropTypes.bool,
  pageType: PropTypes.string.isRequired,
  hasLogo: PropTypes.bool,
  hasBackArrow: PropTypes.bool,
  backRoute: PropTypes.string,
  mobileSize: PropTypes.oneOf(fontSizes),
  desktopSize: PropTypes.oneOf(fontSizes),
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 98px;
  background-color: ${(p) => p.theme.colors.white};
  margin-bottom: ${(p) => p.theme.margin.large};
  justify-content: center;
  ::after {
    content: "";
    display: block;
    left: 0;
    width: 100%;
    height: 10px;
    position: absolute;
    z-index: 10;
    bottom: -10px;
    ${(p) => p.theme.premiumGradient};
  }
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    min-height: 139px;
    ::after {
      height: 15px;
    }
  }
  @media (${(p) => p.theme.mediaQueries.wideDesktop}) {
    padding: ${(p) => p.theme.padding.small};
  }
`;

const HEADER_MAIN_ENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    flex: 1 1 100%;
    max-width: 100%;
    padding: 0 ${(p) => p.theme.padding.small};
  }
  @media (${(p) => p.theme.mediaQueries.wideDesktop}) {
    flex: 1 1 ${(p) => p.theme.page.maxWidth};
    max-width: calc(
      ${(p) => p.theme.page.maxWidth} - (${(p) => p.theme.margin.small} * 4)
    );
    padding: ${(p) => p.theme.padding.none};
  }
`;

const HeaderMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${(p) => p.theme.padding.small};
  flex: 1 1 100%;

  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    flex: 0 0 ${(p) => p.theme.page.mediumWidth};
    padding: ${(p) => p.theme.padding.none};
  }

  @media (${(p) => p.theme.mediaQueries.wideDesktop}) {
    flex: 1 1 ${(p) => p.theme.page.maxWidth};
    max-width: calc(
      ${(p) => p.theme.page.maxWidth} - (${(p) => p.theme.margin.small} * 4)
    );
  }
  ${(p) => p.isEntitled && HEADER_MAIN_ENTITLED}
`;

const FNKLogo = styled(Image)`
  width: 66px;
  height: auto;
  margin-left: 3px;
  position: relative;

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    width: 93px;
  }
`;

const PremiumLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButtonText = styled(ButtonText)`
  font-family: ${(p) => p.theme.fontStyles.fontFamilies.primary};
  letter-spacing: 0.2em;
  line-height: 1.29;
  color: ${(p) => p.theme.colors.premium};
  margin-left: ${(p) => p.theme.margin.extraSmall};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) => p.theme.fontStyles.sizes.extraSmall};
    letter-spacing: 0.39em;
    margin-left: ${(p) => p.theme.margin.space};
  }
`;

const BackArrow = styled.a`
  margin-bottom: ${(p) => p.theme.margin.small};
`;

const StyledBodyText = styled(BodyText)`
  color: ${(p) => p.theme.colors.primary};
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default LandingHeader;
