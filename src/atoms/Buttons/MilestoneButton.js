import PropTypes from "prop-types";
import styled from "styled-components";
import { BodyText } from "/atoms";

const MilestoneButton = ({ onClick, text, isActive, ...props }) => {
  return (
    <StyledButton {...props} isActive={isActive} onClick={onClick}>
      <BodyText size="medium" color={isActive ? "white" : "black"}>
        {text}
      </BodyText>
    </StyledButton>
  );
};

MilestoneButton.displayName = "MilestoneButton";

MilestoneButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default MilestoneButton;

export const StyledButton = styled.button`
  border: none;
  background: ${(p) =>
    p.isActive ? p.theme.colors.black : p.theme.colors.white};
  padding: 0 ${(p) => p.theme.padding.medium};
  width: auto;
  height: 48px;
  border-radius: ${(p) => p.theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(p) => p.theme.boxShadows.light};
  cursor: pointer;
`;
