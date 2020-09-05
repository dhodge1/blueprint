import styled from "styled-components";
import PropTypes from "prop-types";
import { SubHeading } from "/atoms";
import { LiveSchedule } from "/organisms";

const LiveClassesBlock = ({ block, isMobile = false, className }) => {
  const { title, items } = block;

  return items && items.length > 0 ? (
    <Wrapper className={className}>
      <StyledSubHeading fontFamily={"primary"} weight={"semiBold"}>
        {title}
      </StyledSubHeading>
      <LiveSchedule items={items} isMobile={isMobile} />
    </Wrapper>
  ) : null;
};

LiveClassesBlock.propTypes = {
  block: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  className: PropTypes.string,
};

LiveClassesBlock.displayName = "LiveClassesBlock";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: ${(p) => p.theme.padding.small};
  width: 100%;
`;

const StyledSubHeading = styled(SubHeading)`
  padding: ${(p) => p.theme.padding.small};
  width: 100%;
`;

export default LiveClassesBlock;
