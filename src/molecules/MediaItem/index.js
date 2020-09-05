import Link from "next/link";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { CardHeading } from "/atoms";
import { Avatar } from "/molecules";
import { replaceAll } from "/utils";

// eslint-disable-next-line no-unused-vars
const MediaItem = ({ index, item, className, responsive = false }) => {
  const { primaryImage, name } = item;
  const itemFilters = item?.filters ?? [];
  const sanitizedName = replaceAll(name, "\\s", "_").toLowerCase();
  const { url: src = "#" } = primaryImage;

  return (
    <Wrapper className={className}>
      <div>
        <Link
          href={{
            pathname: "/kitchen/classes/topics/[...topics]",
            query: { filters: JSON.stringify(itemFilters) },
          }}
          as={`/kitchen/classes/topics/${sanitizedName}`}
          passHref
        >
          <a>
            <StyledAvatar
              size={"medium"}
              src={src}
              responsive={responsive}
              loading={"lazy"}
            />
          </a>
        </Link>
      </div>
      <div>
        <CardHeading size={"extraSmall"} margin={"small"}>
          <Link
            href={{
              pathname: "/kitchen/classes/topics/[...topics]",
              query: { filters: JSON.stringify(itemFilters) },
            }}
            as={`/kitchen/classes/topics/${sanitizedName}`}
            passHref
          >
            <a>{name}</a>
          </Link>
        </CardHeading>
      </div>
    </Wrapper>
  );
};

MediaItem.displayName = "MediaItem";

MediaItem.propTypes = {
  item: PropTypes.object.isRequired,
  responsive: PropTypes.bool,
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
};

export const Wrapper = styled.li`
  list-style-type: none;
`;

const RESPONSIVE_AVATAR = css`
  width: 96px;
  height: 96px;
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    width: 138px;
    height: 138px;
  }
`;

export const StyledAvatar = styled(Avatar)`
  ${(p) => p.responsive && RESPONSIVE_AVATAR}
`;

export default MediaItem;
