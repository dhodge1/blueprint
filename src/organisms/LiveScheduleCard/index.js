import { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import moment from "moment";
import Link from "next/link";
import { UserContext } from "/context";
import { momentOptions } from "/constants";
import {
  BodyText,
  GradientTextButton,
  Image,
  RemindMeButton,
  SectionSubHeading,
} from "/atoms";
import { RemindMeActionContainer } from "/molecules";
import { getMinutesSecondsUntilTime } from "/utils";

const Countdown = ({ startTime }) => {
  const [countdown, setCountdown] = useState({ minutes: 0, seconds: "00" });

  useEffect(() => {
    let interval = setInterval(() => {
      let timeLeft = getMinutesSecondsUntilTime(startTime);
      setCountdown(timeLeft);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <BodyText block bold color="primary">
      {`Starting in ${countdown.minutes}:${countdown.seconds}`}
    </BodyText>
  );
};

Countdown.propTypes = {
  startTime: PropTypes.string.isRequired,
};

const LiveScheduleCard = ({
  item,
  index,
  isMobile,
  lastInContainer,
  dateIndex,
}) => {
  const { isEntitled } = useContext(UserContext) || { isEntitled: false };
  const { CALENDAR_FORMAT } = momentOptions;

  if (!item.publishingConfig) {
    item.publishingConfig = {
      web: {
        url: false,
        seo: {
          slug: false,
        },
      },
    };
  }

  const {
    id,
    primaryImage,
    title,
    instructors,
    tier,
    startTime,
    publishingConfig: {
      web: {
        url,
        seo: { slug },
      },
    },
  } = item;

  const isFree = tier === "free";
  const initialTimeAway = getMinutesSecondsUntilTime(item.startTime);
  const [isAboutToStart, setIsAboutToStart] = useState(
    (index === 0 || index === 1) &&
      initialTimeAway.minutes < 15 &&
      (initialTimeAway.minutes > 0 ||
        (initialTimeAway.minutes === 0 && initialTimeAway.seconds !== "00"))
  );
  const [isLiveNow, setIsLiveNow] = useState(
    (index === 0 || index === 1) &&
      item.duration &&
      initialTimeAway.minutes < 0 &&
      initialTimeAway.minutes >= 0 - item.duration / 60
  );

  useEffect(() => {
    let interval;
    if (dateIndex === 0 && (index === 0 || index === 1)) {
      interval = setInterval(() => {
        let timeLeft = getMinutesSecondsUntilTime(startTime);
        if (
          !isAboutToStart &&
          timeLeft.minutes < 15 &&
          (timeLeft.minutes > 0 ||
            (timeLeft.minutes === 0 && timeLeft.seconds !== "00"))
        ) {
          setIsAboutToStart(true);
          setIsLiveNow(false);
        } else if (
          !isLiveNow &&
          timeLeft.minutes < 0 &&
          timeLeft.minutes >= 0 - item.duration / 60
        ) {
          setIsAboutToStart(false);
          setIsLiveNow(true);
        } else if (
          (timeLeft.minutes > 15 ||
            timeLeft.minutes < 0 - item.duration / 60) &&
          (isAboutToStart || isLiveNow)
        ) {
          setIsAboutToStart(false);
          setIsLiveNow(false);
        }
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isLiveNow, isAboutToStart]);

  const RemindMe = () =>
    isEntitled ? (
      <RemindMeActionContainer
        startTime={startTime}
        classId={id}
        title={title}
        url={url}
        border
      />
    ) : (
      <RemindMeButton border isLocked handler={() => {}} />
    );

  const handleUnlockClick = () => {
    location.href = "#";
  };

  const ConditionalLink = ({ children }) => {
    return isEntitled || isFree || (!isAboutToStart && !isLiveNow) ? (
      <Link href="/kitchen/classes/[id]" as={`/kitchen/classes/${slug}`}>
        <a>{children}</a>
      </Link>
    ) : (
      <div style={{ cursor: "pointer" }} onClick={handleUnlockClick}>
        {children}
      </div>
    );
  };

  return item && slug ? (
    <ConditionalLink>
      <ClassCard>
        <ClassCardContent lastInContainer={lastInContainer}>
          {!isMobile && (
            <StartTimeColumn>
              <StartTime block size="small">
                {moment(startTime).calendar(CALENDAR_FORMAT)}
              </StartTime>
            </StartTimeColumn>
          )}
          <ImageColumn>
            <StyledImage
              withBorderRadius
              src={primaryImage.url}
              withStrip={!isAboutToStart && !isLiveNow}
            />
            {isAboutToStart || isLiveNow ? <Gradient /> : <PremiumStrip />}
            {isLiveNow && (
              <LiveStrip>
                <BodyText bold color="white">
                  LIVE
                </BodyText>
              </LiveStrip>
            )}
          </ImageColumn>
          <TitleColumn>
            <InnerColumn>
              <Title size="small">{title}</Title>
              <ChefName block size="tiny" desktopSize="small">
                {instructors?.[0]?.title ?? ""}
              </ChefName>
              {isMobile && (
                <>
                  <StartTime block size="tiny">
                    {!isAboutToStart &&
                      !isLiveNow &&
                      moment(startTime).calendar(CALENDAR_FORMAT)}
                    {isAboutToStart && <Countdown startTime={startTime} />}
                  </StartTime>
                  <ButtonWrapper>
                    {isAboutToStart || isLiveNow ? (
                      <GradientTextButton text="Join Live Class" />
                    ) : (
                      <RemindMe />
                    )}
                  </ButtonWrapper>
                </>
              )}
              {!isMobile && isAboutToStart && (
                <Countdown startTime={startTime} />
              )}
            </InnerColumn>
          </TitleColumn>
          {!isMobile && (
            <CTAColumn>
              {isAboutToStart || isLiveNow ? (
                <GradientTextButton text="Join Live Class" />
              ) : (
                <RemindMe />
              )}
            </CTAColumn>
          )}
        </ClassCardContent>
      </ClassCard>
    </ConditionalLink>
  ) : null;
};

LiveScheduleCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  dateIndex: PropTypes.number.isRequired,
  isMobile: PropTypes.bool,
  lastInContainer: PropTypes.bool,
};

LiveScheduleCard.displayName = "LiveScheduleCard";

const ClassCard = styled.div`
  background-color: ${(p) => p.theme.colors.white};
  padding: 0 ${(p) => p.theme.padding.medium};
`;

ClassCard.displayName = "ClassCard";

const ClassCardContent = styled.div`
  border-bottom: ${({ lastInContainer, theme }) =>
    lastInContainer ? 0 : `1px solid ${theme.colors.lightGray}`};
  display: flex;
  flex-direction: row;
  padding: ${(p) => p.theme.padding.medium} 0;
`;

ClassCardContent.displayName = "ClassCardContent";

const COLUMN_FLEX_CENTERED = css`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const StartTimeColumn = styled.div`
  ${COLUMN_FLEX_CENTERED}
  padding-right: ${(p) => p.theme.padding.medium};
  min-width: 85px;
`;

const ImageColumn = styled.div`
  position: relative;
  margin-right: ${(p) => p.theme.margin.medium};
  height: 100%;
`;

const Gradient = styled.div`
  position: absolute;
  z-index: 2;
  opacity: 0.52;
  background-image: linear-gradient(315deg, #ffcc33 -21%, #ff626a 72%);
  border-radius: ${(p) => p.theme.borderRadius};
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const TitleColumn = styled.div`
  ${COLUMN_FLEX_CENTERED}
  width: 100%;

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    width: 472px;
  }
`;

const CTAColumn = styled.div`
  ${COLUMN_FLEX_CENTERED}
  min-width: 175px;
`;

const StyledImage = styled(Image)`
  height: 78px;
  width: 98px;
  margin-bottom: -5px;

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    height: 108px;
    width: 137px;
  }
`;

StyledImage.displayName = "StyledImage";

const PremiumStrip = styled.div`
  position: absolute;
  bottom: 0;
  height: 10px;
  width: 98px;
  border-radius: 0 0 ${(p) => p.theme.borderRadius}
    ${(p) => p.theme.borderRadius};
  ${(p) => p.theme.premiumGradient};

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    width: 137px;
  }
`;

PremiumStrip.displayName = "PremiumStrip";

const LiveStrip = styled.div`
  position: absolute;
  z-index: 3;
  text-align: center;
  bottom: 0;
  height: 22px;
  width: 98px;
  border-radius: 0 0 ${(p) => p.theme.borderRadius}
    ${(p) => p.theme.borderRadius};
  background-color: ${(p) => p.theme.colors.primary};

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    width: 137px;
  }
`;

LiveStrip.displayName = "LiveStrip";

const InnerColumn = styled.div`
  position: relative;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  @media (${(p) => p.theme.mediaQueries.xsMobile}) {
    position: static;
    margin-top: 0.5rem;
  }
  position: absolute;
  right: 0;
  bottom: -4px;
`;

const Title = styled(SectionSubHeading)`
  line-height: 1;
`;

Title.displayName = "Title";

const ChefName = styled(BodyText)`
  margin-top: 0.6rem;
`;

ChefName.displayName = "ChefName";

const StartTime = styled(BodyText)`
  color: ${(p) => (p.isMobile ? p.theme.colors.primary : p.theme.colors.black)};
  font-family: ${(p) => p.theme.fontStyles.fontFamilies.condensed};
  font-weight: ${(p) => p.theme.fontStyles.weights.bold};
  margin-top: 0.2rem;

  a:link {
    color: ${(p) => p.theme.colors.primary};
  }
`;

StartTime.displayName = "StartTime";

export default LiveScheduleCard;
