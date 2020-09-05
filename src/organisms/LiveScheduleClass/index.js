import { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";
import Link from "next/link";
import { UserContext } from "/context";
import { momentOptions } from "/constants";
import {
  Image,
  SectionSubHeading,
  BodyText,
  Truncate,
  RemindMeButton,
} from "/atoms";
import { RemindMeActionContainer } from "/molecules";

// eslint-disable-next-line no-unused-vars
const LiveScheduleClass = ({ item, index }) => {
  const {
    id,
    primaryImage,
    title,
    instructors,
    startTime,
    publishingConfig: {
      web: {
        url,
        seo: { slug },
      },
    },
  } = item;
  const { isEntitled } = useContext(UserContext) || { isEntitled: false };
  const { CALENDAR_FORMAT } = momentOptions;

  return (
    <Link href="/kitchen/classes/[id]" as={`/kitchen/classes/${slug}`}>
      <a>
        <ListItem>
          <Column>
            <StyledImage withBorderRadius src={primaryImage.url} />
          </Column>
          <MetadataColumn>
            <div>
              <Title fontFamily={"condensed"} size="extraSmall">
                <Truncate maxLines={2}>{title}</Truncate>
              </Title>
              <ChefName block size="tiny">
                {instructors?.[0]?.title ?? ""}
              </ChefName>
              <StartTime
                block
                fontFamily={"condensed"}
                weight={"bold"}
                size="tiny"
              >
                {moment(startTime).calendar(CALENDAR_FORMAT)}
              </StartTime>
            </div>
            {isEntitled ? (
              <StyledRemindMeActionContainer
                startTime={startTime}
                classId={id}
                title={title}
                url={url}
                border
                isCompressed
              />
            ) : (
              <StyledRemindMeButton
                handler={() => {}}
                border
                isLocked
                isCompressed
              />
            )}
          </MetadataColumn>
        </ListItem>
      </a>
    </Link>
  );
};

LiveScheduleClass.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

LiveScheduleClass.displayName = "LiveScheduleClass";

export default LiveScheduleClass;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  margin: ${(p) => p.theme.margin.medium} 0;
`;

ListItem.displayName = "ListItem";

const Column = styled.div`
  display: flex;
  padding-right: ${(p) => p.theme.padding.small};
  width: 90px;
  position: relative;

  & + div {
    width: 100%;
  }
`;

Column.displayName = "Column";

const MetadataColumn = styled(Column)`
  flex-wrap: wrap;
  align-items: flex-start;
`;

MetadataColumn.displayName = "MetadataColumn";

const StyledImage = styled(Image)`
  height: 115px;
  width: 80px;
`;

StyledImage.displayName = "StyledImage";

const Title = styled(SectionSubHeading)`
  line-height: 1;
`;

Title.displayName = "Title";

const ChefName = styled(BodyText)`
  margin-top: 0.2rem;
`;

ChefName.displayName = "ChefName";

const StartTime = styled(BodyText)`
  margin-top: 0.2rem;
  color: ${(p) => p.theme.colors.primary};

  a:link {
    color: ${(p) => p.theme.colors.primary};
  }
`;

StartTime.displayName = "StartTime";

const StyledRemindMeActionContainer = styled(RemindMeActionContainer)`
  align-self: flex-end;
`;

StyledRemindMeActionContainer.displayName = "StyledRemindMeActionContainer";

const StyledRemindMeButton = styled(RemindMeButton)`
  align-self: flex-end;
`;

StyledRemindMeButton.displayName = "StyledRemindMeButton";
