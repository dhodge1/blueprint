import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { classes } from "/constants";
import { defaultClass } from "/mocks";
import { SubHeading, SectionSubHeading, BodyText, Truncate } from "/atoms";
import { PercentLikes } from "/molecules";

const { DEFAULT_CLASS, LIVE_CLASS } = classes.classType;

const ClassCardInfo = ({
  classData,
  lead = false,
  classType,
  fontFamily = "primary",
  weight = "semiBold",
}) => {
  const { instructors = [], title = "", duration = 0, difficulty = "" } =
    classData || defaultClass;
  const durationInMins = Math.round(duration / 60);
  return (
    <ClassCardInfoWrapper lead={lead} classType={classType}>
      <ClassCardInfoBody>
        <InstructorNames as="p" lead={lead}>
          {instructors.map((instructor) => instructor?.title ?? "").join(", ")}
        </InstructorNames>
        <ClassTitle fontFamily={fontFamily} weight={weight} lead={lead}>
          <TruncatedTitle maxLines={3} lead={lead}>
            {title}
          </TruncatedTitle>
        </ClassTitle>
        <SecondaryInfo lead={lead}>
          <ClassDuration as="p" lead={lead}>
            {durationInMins}m
          </ClassDuration>
          <ClassDifficulty as="p" lead={lead}>
            {difficulty}
          </ClassDifficulty>
        </SecondaryInfo>
      </ClassCardInfoBody>
      <CardInfoFooter classData={classData} lead={lead} classType={classType} />
    </ClassCardInfoWrapper>
  );
};

ClassCardInfo.propTypes = {
  classData: PropTypes.object.isRequired,
  lead: PropTypes.bool,
  classType: PropTypes.string,
  fontFamily: PropTypes.oneOf(["primary", "condensed", "quote"]),
  weight: PropTypes.oneOf(["thin", "normal", "semiBold", "bold"]),
};

ClassCardInfo.defaultProps = {
  classType: DEFAULT_CLASS,
};

const LIVE_CLASS_CSS = css`
  padding-bottom: ${(p) => p.theme.padding.small};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    padding-bottom: ${(p) => p.theme.padding.small};
  }
`;

const LEAD_INFO_WRAPPER = css`
  padding: ${(p) => p.theme.padding.medium};
  padding-top: ${(p) => p.theme.padding.none};
  background-color: transparent;
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    padding: ${(p) => p.theme.padding.large};
    padding-top: ${(p) => p.theme.padding.none};
  }
  ${(p) => (p.classType === LIVE_CLASS ? LIVE_CLASS_CSS : css``)}
`;

const STANDARD_INFO_WRAPPER = css`
  padding: calc(${(p) => p.theme.padding.extraSmall} * 2);
  background-color: ${(p) => p.theme.colors.white};
  border-radius: 0 0 6px 6px;
`;

const ClassCardInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${(p) => (p.lead ? LEAD_INFO_WRAPPER : STANDARD_INFO_WRAPPER)}
`;

const ClassCardInfoBody = styled.div`
  flex: 1 1 100%;
`;

const ClassCardInfoFooter = styled.div`
  display: flex;
  flex: 1 1 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: -5px;
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    top: ${(p) => (p.lead ? "-9px" : "-5px")};
  }
`;

const CardInfoFooter = ({ classData, lead, classType }) => {
  const { type = "", percentLikes = 0 } = classData || defaultClass;

  if (classType !== LIVE_CLASS) {
    return (
      <ClassCardInfoFooter lead={lead}>
        <AssetType uppercase lead={lead}>
          {type}
        </AssetType>
        <PercentLikes percentLikes={percentLikes} lead={lead} />
      </ClassCardInfoFooter>
    );
  }
  return null;
};

CardInfoFooter.propTypes = {
  classData: PropTypes.object.isRequired,
  lead: PropTypes.bool,
  classType: PropTypes.string,
};

CardInfoFooter.defaultProps = {
  classType: DEFAULT_CLASS,
};

const LEAD_INSTRUCTOR_NAMES = css`
  font-size: ${(p) => p.theme.fontStyles.sizes.small};
  line-height: 0.88;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  color: ${(p) => p.theme.colors.white};
  margin-bottom: ${(p) => p.theme.margin.extraSmall};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: 22px;
    line-height: 0.64;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  }
`;

const STANDARD_INSTRUCTOR_NAMES = css`
  font-size: ${(p) => p.theme.fontStyles.sizes.tiny};
  line-height: 0.71;
  color: ${(p) => p.theme.colors.black};
  margin-bottom: ${(p) => p.theme.margin.small};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) => p.theme.fontStyles.sizes.small};
    line-height: 0.7;
    margin-bottom: ${(p) => p.theme.margin.extraSmall};
  }
`;

const InstructorNames = styled(BodyText)`
  ${(p) => (p.lead ? LEAD_INSTRUCTOR_NAMES : STANDARD_INSTRUCTOR_NAMES)}
`;

const LEAD_CLASS_TITLE = css`
  font-size: ${(p) => p.theme.fontStyles.sizes.large};
  line-height: 0.91;
  letter-spacing: ${(p) => p.theme.fontStyles.letterSpacing.normal};
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.54);
  color: ${(p) => p.theme.colors.white};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) => p.theme.fontStyles.sizes.extraLarge};
    line-height: 1;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    margin-bottom: ${(p) => p.theme.margin.none};
  }
`;

const STANDARD_CLASS_TITLE = css`
  font-size: ${(p) => p.theme.fontStyles.sizes.extraSmall};
  line-height: 1;
  letter-spacing: ${(p) => p.theme.fontStyles.letterSpacing.extraSmall};
  color: ${(p) => p.theme.colors.black};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) => p.theme.fontStyles.sizes.medium};
    line-height: 1.11;
    margin-bottom: ${(p) => p.theme.margin.extraSmall};
  }
`;

const ClassTitle = styled(SubHeading)`
  ${(p) => (p.lead ? LEAD_CLASS_TITLE : STANDARD_CLASS_TITLE)}
  @media(${(p) => p.theme.mediaQueries.desktop}) {
    letter-spacing: ${(p) => p.theme.fontStyles.letterSpacing.normal};
  }
`;

const LEAD_TRUNCATED_TITLE = css`
  height: auto;
  margin-bottom: ${(p) => p.theme.margin.none};
  ${"-webkit"}-line-clamp: inherit;
`;

const TruncatedTitle = styled(Truncate)`
  ${(p) => p.lead && LEAD_TRUNCATED_TITLE}
`;

const LEAD_SECONDARY_INFO = css`
  font-size: ${(p) => p.theme.fontStyles.sizes.extraSmall};
  color: ${(p) => p.theme.colors.white};
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  line-height: 1;
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) => p.theme.fontStyles.sizes.large};
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    line-height: 0.64;
  }
`;

const STANDARD_SECONDARY_INFO = css`
  color: ${(p) => p.theme.colors.black};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    margin-bottom: ${(p) => p.theme.margin.extraSmall};
    line-height: 1;
  }
`;

const SecondaryInfo = styled.div`
  display: inline-flex;
  margin-bottom: ${(p) => p.theme.margin.extraSmall};
  ${(p) => (p.lead ? LEAD_SECONDARY_INFO : STANDARD_SECONDARY_INFO)}
`;

const LEAD_DURATION = css`
  color: ${(p) => p.theme.colors.white};
`;

const STANDARD_DURATION = css`
  font-size: ${(p) => p.theme.fontStyles.sizes.tiny};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) => p.theme.fontStyles.sizes.extraSmall};
  }
`;

const ClassDuration = styled(BodyText)`
  ${(p) => (p.lead ? LEAD_DURATION : STANDARD_DURATION)}
`;

const LEAD_DIFFICULTY = css`
  color: ${(p) => p.theme.colors.white};
  text-transform: capitalize;
`;

const STANDARD_DIFFICULTY = css`
  text-transform: capitalize;
  font-size: ${(p) => p.theme.fontStyles.sizes.tiny};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) => p.theme.fontStyles.sizes.extraSmall};
  }
`;

const ClassDifficulty = styled(BodyText)`
  &::before {
    content: "•";
    margin: ${(p) => p.theme.margin.none} ${(p) => p.theme.margin.extraSmall};
  }
  ${(p) => (p.lead ? LEAD_DIFFICULTY : STANDARD_DIFFICULTY)}
`;

const LEAD_ASSET_TYPE = css`
  font-size: ${(p) => p.theme.fontStyles.sizes.extraSmall};
  line-height: 1;
  letter-spacing: ${(p) => p.theme.fontStyles.letterSpacing.normal};
  color: ${(p) => p.theme.colors.white};
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) => p.theme.fontStyles.sizes.large};
    letter-spacing: 1.11px;
  }
`;

const STANDARD_ASSET_TYPE = css`
  font-size: ${(p) => p.theme.fontStyles.sizes.tiny};
  line-height: 1;
  letter-spacing: ${(p) => p.theme.fontStyles.letterSpacing.extraSmall};
  color: ${(p) => p.theme.colors.black};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) => p.theme.fontStyles.sizes.extraSmall};
    letter-spacing: ${(p) => p.theme.fontStyles.letterSpacing.extraSmall};
  }
`;

const AssetType = styled(SectionSubHeading)`
  ${(p) => (p.lead ? LEAD_ASSET_TYPE : STANDARD_ASSET_TYPE)}
`;

export default ClassCardInfo;
