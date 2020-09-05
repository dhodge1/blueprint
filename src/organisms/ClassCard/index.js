import { useContext } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { UserContext } from "/context";
import { defaultClass } from "/mocks";
import { Image } from "/atoms";
import { ClassCardInfo, PremiumTag } from "/molecules";

const ClassCard = ({ className, classData }) => {
  const { isEntitled } = useContext(UserContext) || { isEntitled: false };

  if (classData === null || Object.keys(classData).length <= 1) return null;
  if (classData.publishingConfig === null)
    classData.publishingConfig = undefined;

  const {
    primaryImage,
    tier = "",
    title = "",
    publishingConfig: { web: { seo: { slug = "#" } = {} } = {} } = {},
  } = classData || defaultClass;

  const imageUrl = primaryImage?.url ?? "#";
  const isPremium = tier === "premium";

  if (!slug)
    console.warn(`${title} (${classData.id}) is missing publishingConfig`);

  return classData && slug ? (
    <Link href="/kitchen/classes/[id]" as={`/kitchen/classes/${slug}`} passHref>
      <Card isEntitled={isEntitled} className={className}>
        {!isEntitled && isPremium && <PremiumTag small />}
        <StyledImage src={imageUrl} loading={"lazy"} />
        <ClassCardInfo classData={classData} />
      </Card>
    </Link>
  ) : null;
};

ClassCard.propTypes = {
  className: PropTypes.string,
  classData: PropTypes.object.isRequired,
  blockTitle: PropTypes.string,
  index: PropTypes.number,
};

const CARD_ENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    flex: 0 1 calc(25% - ${(p) => p.theme.margin.small} * 2);
  }
`;

const Card = styled.a`
  display: flex;
  flex-direction: column;
  border-radius: ${(p) => p.theme.borderRadius};
  box-shadow: 0 0 2px 0 rgba(28, 28, 28, 0.21);
  background: ${(p) => p.theme.colors.white};
  margin: ${(p) => p.theme.margin.small};
  flex: 0 1 calc(50% - ${(p) => p.theme.margin.small} * 2);
  height: 244px;
  position: relative;
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    flex: 0 1 calc(33.3% - ${(p) => p.theme.margin.small} * 2);
    height: 331px;
  }

  ::after {
    content: "";
    width: 100%;
    height: 10px;
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: ${(p) => p.theme.borderRadius};
    border-bottom-right-radius: ${(p) => p.theme.borderRadius};
    ${(p) => p.theme.premiumGradient};
  }
  ${(p) => p.isEntitled && CARD_ENTITLED}
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 121px;
  border-radius: ${(props) => props.theme.borderRadius}
    ${(props) => props.theme.borderRadius} 0 0;
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    height: 184px;
  }
`;

export default ClassCard;
