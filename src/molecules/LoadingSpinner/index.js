import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import config from "/config";

const LoadingSpinner = ({ className, fullPage }) => (
  <Wrapper className={className} fullPage={fullPage}>
    <Image
      src={`${config.publicFolderPath}/burgerLoader_120x120px.gif`}
      loop="infinite"
    />
  </Wrapper>
);

LoadingSpinner.propTypes = {
  className: PropTypes.string,
  fullPage: PropTypes.bool,
};

export default LoadingSpinner;

const Image = styled.img`
  height: 120px;
  width: 120px;
`;

const Wrapper = styled.div`
  text-align: center;
  ${(p) =>
    p.fullPage &&
    `
    width: 100%;
    height: 100vh;
    `}
`;
