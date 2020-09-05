import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { BodyText } from "/atoms";

const Footer = ({ footer }) => {
  return (
    <StyledFooter>
      <StyledList>
        {Object.entries(footer).map(([key, value]) => (
          <StyledListItem key={key}>
            <StyledBodyText size="tiny">
              <a href={value} target="_blank" rel="noopener noreferrer">
                {key}
              </a>
            </StyledBodyText>
          </StyledListItem>
        ))}
      </StyledList>
    </StyledFooter>
  );
};

Footer.propTypes = {
  footer: PropTypes.object.isRequired,
};

const COMMON_FLEX = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFooter = styled.nav`
  width: 100%;
  min-height: ${(p) => p.theme.footerHeight.default};
  padding: ${(p) => p.theme.padding.medium} 0;
  background-color: ${(p) => p.theme.colors.black};
  ${COMMON_FLEX}
  @media(${(p) => p.theme.mediaQueries.desktop}) {
    padding: 0;
  }
  ${(p) => {
    if (p.isMobile && p.positionFooter) {
      return `
        display: none !important;
      `;
    }
  }}
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  line-height: 0.5;
  ${COMMON_FLEX}
  flex-wrap: wrap;
`;

const StyledListItem = styled.li`
  padding: ${(p) => p.theme.padding.extraSmall} ${(p) => p.theme.padding.space};
`;

const StyledBodyText = styled(BodyText)`
  color: ${(p) => p.theme.colors.white};
`;

export default Footer;
