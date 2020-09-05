import styled from "styled-components";
import PropTypes from "prop-types";
import { SubHeading } from "/atoms";
import { ClassCard, LeadClassCard } from "/organisms";

const ClassBlock = ({
  block,
  className,
  isMobile = false,
  isEntitled = false,
}) => {
  const { title, items } = block;
  const blockTitle = block?.title ?? "";
  const classItems = items.filter(
    (item) => item.type && item.type.toLowerCase() === "class"
  );
  const [lead, ...classes] = classItems;
  const cardLimit = isEntitled ? 4 : isMobile ? 4 : 6;
  const classSubset = classes ? classes.slice(0, cardLimit) : [];
  return lead && classSubset && classSubset.length > 0 ? (
    <ClassGrid className={className}>
      <StyledSubHeading fontFamily={"primary"} weight={"semiBold"}>
        {title}
      </StyledSubHeading>
      <LeadClassCard classData={lead} blockTitle={blockTitle} />
      {classSubset.map((classItem, index) => (
        <ClassCard
          key={`${classItem?.id ?? ""}-${title}-${index}`}
          index={index + 1}
          classData={classItem}
          blockTitle={blockTitle}
        />
      ))}
    </ClassGrid>
  ) : null;
};

ClassBlock.propTypes = {
  block: PropTypes.object.isRequired,
  className: PropTypes.string,
  isMobile: PropTypes.bool,
  isEntitled: PropTypes.bool,
};

ClassBlock.displayName = "ClassBlock";

const ClassGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: ${(p) => p.theme.padding.small};
`;

const StyledSubHeading = styled(SubHeading)`
  padding: ${(p) => p.theme.padding.small};
  width: 100%;
`;

export default ClassBlock;
