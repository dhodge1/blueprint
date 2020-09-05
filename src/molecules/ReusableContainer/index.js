import styled from "styled-components";
import PropTypes from "prop-types";

const ReusableContainer = ({ children, className }) => (
  <Container className={className}>{children}</Container>
);

const Container = styled.div`
  min-height: ${(p) => p.minHeight || "100vh"};
  display: flex;
  flex-direction: ${(p) => p.direction || "row"};
  flex-wrap: ${(p) => p.wrap || "wrap"};
  justify-content: ${(p) => p.justification || "center"};
  align-items: ${(p) => p.alignment || "center"};
  margin: ${(p) => p.margin || p.theme.margin.large};
`;

ReusableContainer.propTypes = {
  className: PropTypes.string,
};

export default ReusableContainer;
