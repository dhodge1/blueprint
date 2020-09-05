import { useContext } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";
import { UserContext, PageContext } from "/context";
import { classes, routes } from "/constants";
import { SubHeading, BodyText } from "/atoms";
import { LeadClassCard, LiveScheduleClass } from "/organisms";

const { LIVE_CLASS } = classes.classType;

const LiveSchedule = ({ items, isMobile }) => {
  const useableItems = items.filter((item) => item !== null);
  const limit = isMobile ? 2 : 3;
  const upcomingCLassData = useableItems.slice(0, 1);
  const followingClassData = useableItems.slice(1, limit + 1);
  const { clickMetadata, setClickMetadata } = useContext(PageContext); // eslint-disable-line no-unused-vars
  const { isEntitled } = useContext(UserContext) || { isEntitled: false };

  const handleClick = () => {
    setClickMetadata((state) => ({
      ...state,
      moduleName: "live class schedule",
      linkTitle: "see full schedule",
      linkPosition: "0",
    }));
  };

  return (
    <>
      {upcomingCLassData.length > 0 && (
        <StyledLeadClassCard
          classData={upcomingCLassData[0]}
          classType={LIVE_CLASS}
          blockTitle="live class schedule"
          isEntitled={isEntitled}
        />
      )}
      {followingClassData.length > 0 && (
        <Wrapper>
          <Header>
            <StyledSubHeading size="extraSmall">
              Live Class Schedule
            </StyledSubHeading>
          </Header>
          <UnorderedList>
            {followingClassData.map((item, index) => (
              <LiveScheduleClass
                key={item?.id ?? index}
                item={item}
                index={index}
              />
            ))}
          </UnorderedList>
          <Footer size="extraSmall" padding="medium">
            <Link href={routes.LIVE_CLASS_SCHEDULE}>
              <a onClick={handleClick}>See Full Schedule</a>
            </Link>
          </Footer>
        </Wrapper>
      )}
    </>
  );
};

LiveSchedule.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isMobile: PropTypes.bool,
};

const LEAD_CLASS_CARD_UNENTITLED = css`
  flex: 1 1 56%;
`;

const StyledLeadClassCard = styled((p) => <LeadClassCard {...p} />)`
  flex: 1 1 calc(75% - ${(p) => p.theme.margin.small} * 2);
  ${(p) => !p.isEntitled && LEAD_CLASS_CARD_UNENTITLED}
`;

StyledLeadClassCard.displayName = "StyledLeadClassCard";

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.borderRadius};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${(p) => p.theme.margin.small};
  flex: 1 1 calc(25% - ${(p) => p.theme.margin.small} * 2);
`;

const Header = styled.div`
  padding: 1rem 1rem 0;
  width: 100%;
`;

const StyledSubHeading = styled(SubHeading)`
  border-bottom: 2px solid;
  border-image-slice: 0 0 1;
  border-image-source: linear-gradient(to left, #ff626a, #ffcc33);
  letter-spacing: ${(p) => p.theme.fontStyles.letterSpacing.medium};
  padding: 0 1rem 1rem;
  text-align: center;
  text-transform: uppercase;
`;

StyledSubHeading.displayName = "StyledHeading";

const UnorderedList = styled.ul`
  border-bottom: solid 1.2px ${(p) => p.theme.colors.lightGray};
  list-style-type: none;
  margin: ${(p) => p.theme.margin.none};
  padding: 0 1rem;
  width: 100%;

  .li > {
    margin: 30px;
  }
`;

UnorderedList.displayName = "UnorderedList";

const Footer = styled(BodyText)`
  text-align: center;

  a:link {
    color: ${(p) => p.theme.colors.primary};
  }
`;

Footer.displayName = "Footer";

export default LiveSchedule;
