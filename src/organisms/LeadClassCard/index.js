import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css, ThemeContext } from "styled-components";
import Link from "next/link";
import { UserContext } from "/context";
import { classes } from "/constants";
import { defaultClass } from "/mocks";
import { ClassLabel, Image, SecondaryTextButton, RemindMeButton } from "/atoms";
import {
  Avatar,
  ClassCardInfo,
  PremiumTag,
  RemindMeBanner,
  RemindMeActionContainer,
  TimerBanner,
} from "/molecules";
import { getMinutesUntilDate } from "/utils";

import config from "/config";

const { DEFAULT_CLASS, LIVE_CLASS } = classes.classType;

const LeadClassCard = ({ classData, className, classType, blockTitle }) => {
  const themeContext = useContext(ThemeContext);
  const { isEntitled } = useContext(UserContext) || { isEntitled: false };
  const [cardHref, setCardHref] = useState();

  if (classData === null || Object.keys(classData).length <= 1) return null;

  const {
    primaryImage,
    instructors = [],
    tier = "",
    startTime = "",
    duration = 0,
    publishingConfig: {
      web: {
        seo: { slug },
      },
    },
  } = classData || defaultClass;

  const isPremium = tier === "premium";
  const { leadCard = 1200 } = themeContext.imageSizes;
  const { cardImageSize = 600 } = config.classLandingPage;
  const regex = new RegExp(`w_${cardImageSize}`, "g");
  const avatarImage = instructors?.[0]?.primaryImage?.url ?? "";
  const image = primaryImage?.url ?? "#";
  const cardImage = image.replace(regex, `w_${parseInt(leadCard)}`);
  const goToClassDetails =
    isEntitled ||
    classType !== LIVE_CLASS ||
    (classType === LIVE_CLASS && !isPremium) ||
    (classType === LIVE_CLASS &&
      startTime &&
      getMinutesUntilDate(startTime) > 15);

  const initialMinutesAway = getMinutesUntilDate(startTime);
  const [isAboutToStart, setIsAboutToStart] = useState(
    initialMinutesAway < 15 && initialMinutesAway >= 0
  );
  const [isLiveNow, setIsLiveNow] = useState(
    duration &&
      initialMinutesAway < 0 &&
      initialMinutesAway >= 0 - duration / 60
  );

  useEffect(() => {
    if (classType === LIVE_CLASS && blockTitle === "live class schedule") {
      let interval = setInterval(() => {
        let timeLeft = getMinutesUntilDate(startTime);

        if (!isAboutToStart && timeLeft < 15 && timeLeft >= 0) {
          setIsAboutToStart(true);
          setIsLiveNow(false);
        } else if (
          !isLiveNow &&
          duration &&
          timeLeft < 0 &&
          timeLeft >= 0 - duration / 60
        ) {
          setIsAboutToStart(false);
          setIsLiveNow(true);
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isAboutToStart, isLiveNow]);

  const linkProps = {};

  const cardProps = {
    className,
    classType,
    isEntitled,
  };

  let ConditionalLink = React.Fragment;

  if (goToClassDetails) {
    ConditionalLink = Link;
    linkProps.href = "/kitchen/classes/[id]";
    linkProps.as = `/kitchen/classes/${slug}`;
    linkProps.passHref = true;
  }

  useEffect(() => {
    if (!goToClassDetails) {
      setCardHref("#");
    }
  }, [goToClassDetails, setCardHref]);

  return (
    <ConditionalLink {...linkProps}>
      <Card href={cardHref} {...cardProps}>
        {!isEntitled && isPremium && <PremiumTag />}
        {(isAboutToStart || isLiveNow) && <Gradient />}
        {isLiveNow && <ClassLabel isLive />}
        <CardImage src={cardImage} />
        <CardContent
          classType={classType}
          hasBanner={!isAboutToStart && !isLiveNow}
        >
          <CardAvatar src={avatarImage} size="small" hasBorder={true} />
          <ClassCardInfo
            fontFamily={"primary"}
            weight={"bold"}
            classData={classData}
            lead={true}
            classType={classType}
          />
          {(isAboutToStart || isLiveNow) && (
            <ButtonWrapper>
              <SecondaryTextButton
                onClick={() => {}}
                text={"Join Live Class"}
              />
            </ButtonWrapper>
          )}
          {classType === LIVE_CLASS && !(isAboutToStart || isLiveNow) ? (
            isEntitled ? (
              <ButtonWrapper>
                <RemindMeActionContainer
                  startTime={classData.startTime}
                  classId={classData.id}
                  title={classData.title}
                  url={classData.publishingConfig.web.url}
                />
              </ButtonWrapper>
            ) : (
              <ButtonWrapper>
                <RemindMeButton isLocked />
              </ButtonWrapper>
            )
          ) : null}
        </CardContent>
        {classType === LIVE_CLASS && !isLiveNow && (
          <CardBanner
            classData={classData}
            classType={classType}
            isAboutToStart={isAboutToStart}
            isLiveNow={isLiveNow}
          />
        )}
      </Card>
    </ConditionalLink>
  );
};

LeadClassCard.propTypes = {
  classData: PropTypes.object.isRequired,
  className: PropTypes.string,
  premiumTag: PropTypes.bool,
  classType: PropTypes.string,
  blockTitle: PropTypes.string.isRequired,
};

LeadClassCard.defaultProps = {
  classType: DEFAULT_CLASS,
};

const BOTTOM_BAR = css`
  ::after {
    content: "";
    width: 100%;
    height: 10px;
    position: absolute;
    z-index: 10;
    bottom: 0;
    border-bottom-left-radius: ${(p) => p.theme.borderRadius};
    border-bottom-right-radius: ${(p) => p.theme.borderRadius};
    ${(p) => p.theme.premiumGradient};

    @media (${(p) => p.theme.mediaQueries.desktop}) {
      height: 15px;
    }
  }
`;

const CARD_ENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    flex: 1 1 ${(p) => p.theme.page.maxWidth};
  }
`;

const Card = styled.a`
  border-radius: ${(p) => p.theme.borderRadius};
  overflow: hidden;
  position: relative;
  flex: 1 1 100%;
  height: 335px;
  margin: ${(p) => p.theme.margin.small};
  background: linear-gradient(rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.18));
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    flex: 0 1 900px;
    height: 509px;
  }
  ${(p) => p.classType === DEFAULT_CLASS && BOTTOM_BAR}
  ${(p) => p.isEntitled && CARD_ENTITLED}
`;

const CardImage = styled(Image)`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  border-radius: ${(p) => p.theme.borderRadius};
  opacity: 0.88;
`;

const CardAvatar = styled(Avatar)`
  margin-left: calc(${(p) => p.theme.margin.space} * 3);
  margin-bottom: ${(p) => p.theme.margin.space};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    margin-left: calc(${(p) => p.theme.margin.small} * 3);
    margin-bottom: ${(p) => p.theme.margin.medium};
    width: 75px;
    height: 75px;
  }
`;

const CardContent = styled.div`
  z-index: 3;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  padding: 0 0 ${(p) => p.theme.padding.medium} ${(p) => p.theme.padding.medium};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    padding: 0 0 ${(p) => p.theme.padding.large} ${(p) => p.theme.padding.large};
  }
`;

const LiveClassBanner = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  ${(p) =>
    p.isOnTop
      ? `
    top: 0;
  `
      : "bottom: 0;"}
`;

const Gradient = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.52;
  background-image: linear-gradient(315deg, #ffcc33 -21%, #ff626a 72%);
  border-radius: ${(p) => p.theme.borderRadius};
`;

Gradient.displayName = "Gradient";

const CardBanner = ({ classData, isAboutToStart }) => {
  return (
    <LiveClassBanner isOnTop={true}>
      {isAboutToStart ? (
        <TimerBanner startTime={classData.startTime} isOnCard isOnTop />
      ) : (
        <RemindMeBanner
          startTime={classData.startTime}
          url={classData.publishingConfig.web.url}
          title={classData.title}
          classId={classData.id}
        />
      )}
    </LiveClassBanner>
  );
};

CardBanner.propTypes = {
  classData: PropTypes.object.isRequired,
  isAboutToStart: PropTypes.bool,
};

CardBanner.defaultProps = {
  classType: DEFAULT_CLASS,
};

export default LeadClassCard;
