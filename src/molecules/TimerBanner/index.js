import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { SubHeading } from "/atoms";
import { getMinutesSecondsUntilTime } from "/utils";

const TimerBanner = ({ startTime, isOnCard, isOnTop = false }) => {
  const [timerValue, setTimerValue] = useState({});
  const [timeLeft, setTimeLeft] = useState(
    getMinutesSecondsUntilTime(startTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getMinutesSecondsUntilTime(startTime));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft !== timerValue) setTimerValue(timeLeft);
  }, [timeLeft]);

  return (
    <Wrapper isOnCard={isOnCard} isOnTop={isOnTop}>
      <SubHeading color="white">
        Starting In{" "}
        {(timeLeft?.minutes ?? 0) >= 0
          ? timerValue.seconds && `${timerValue.minutes}:${timerValue.seconds}`
          : "0:00"}
      </SubHeading>
    </Wrapper>
  );
};

export default TimerBanner;

TimerBanner.displayName = "TimerBanner";

TimerBanner.propTypes = {
  startTime: PropTypes.string,
  isOnCard: PropTypes.bool,
  isOnTop: PropTypes.bool,
};

const TOP_WRAPPER = css`
  top: 0;
`;

const BOTTOM_WRAPPER = css`
  bottom: 0;
`;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  padding: ${(p) => p.theme.padding.small} ${(p) => p.theme.padding.medium};
  z-index: 5;
  width: 100%;
  height: 40px;

  ${(p) => (p.isOnTop ? TOP_WRAPPER : BOTTOM_WRAPPER)}

  ${(p) =>
    `background-image: linear-gradient(278deg, ${p.theme.colors.primaryGradientStop1} -34%, ${p.theme.colors.primaryGradientStop2});`};

  ${(p) =>
    p.isOnCard
      ? `
    border-radius: ${p.theme.borderRadius} ${p.theme.borderRadius} 0 0;
  `
      : `
    @media(${(p) => p.theme.mediaQueries.desktop}) {
      border-radius: 0 0 ${p.theme.borderRadius} ${p.theme.borderRadius};
    }
  `}

  @media(${(p) => p.theme.mediaQueries.desktop}) {
    height: 60px;
  }
`;
