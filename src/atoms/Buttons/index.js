import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import config from "@config";
import BaseButton from "./BaseButton";
export * from "./ArrowButtons";
export { default as MilestoneButton } from "./MilestoneButton";
export { default as RemindMeButton } from "./RemindMeButton";
export { default as BaseButton } from "./BaseButton";

export const ShareButton = ({ onClick, isCondensed }) => {
  return (
    <BaseButton
      buttonColor="primary"
      borderColor="primary"
      textColor="white"
      text="Share"
      icon={`${config.publicFolderPath}/shareWhite.svg`}
      desktopSize="tiny"
      onClick={onClick}
      isCondensed={isCondensed}
    />
  );
};

ShareButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCondensed: PropTypes.bool,
};

ShareButton.displayName = "ShareButton";

export const PrintButton = ({ onClick, isCondensed }) => {
  return (
    <BaseButton
      buttonColor="primary"
      borderColor="primary"
      textColor="white"
      text="Print"
      icon={`${config.publicFolderPath}/print.svg`}
      desktopSize="tiny"
      onClick={onClick}
      isCondensed={isCondensed}
    />
  );
};

PrintButton.propTypes = {
  isCondensed: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

PrintButton.displayName = "PrintButton";

export const ShopButton = ({
  isCondensed,
  isMobile,
  mobileWording,
  numberOfItems,
  onClick,
}) => {
  const itemsText =
    !numberOfItems || numberOfItems > 1 || numberOfItems === 0
      ? "Items"
      : "Item";
  const buttonText = numberOfItems
    ? `Shop ${numberOfItems} ${itemsText}`
    : `Shop ${itemsText}`;
  return (
    <BaseButton
      buttonColor="primary"
      borderColor="primary"
      isMobile={isMobile}
      mobileWording={mobileWording}
      text={buttonText}
      textColor="white"
      icon={`${config.publicFolderPath}/shoppingCart.svg`}
      desktopSize="tiny"
      onClick={onClick}
      isCondensed={isCondensed}
    />
  );
};

ShopButton.propTypes = {
  isCondensed: PropTypes.bool,
  isMobile: PropTypes.bool,
  mobileWording: PropTypes.string,
  numberOfItems: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

ShopButton.displayName = "ShopButton";

export const SaveClassButton = ({ onClick, isCondensed, isSaved }) => {
  const icon = isSaved
    ? `${config.publicFolderPath}/saveWhiteFilled.svg`
    : `${config.publicFolderPath}/saveWhite.svg`;
  const text = isSaved ? "Saved" : "Save Class";
  return (
    <BaseButton
      buttonColor="primary"
      borderColor="primary"
      textColor="white"
      text={text}
      icon={icon}
      desktopSize="tiny"
      onClick={isSaved ? () => {} : onClick}
      isCondensed={isCondensed}
    />
  );
};

SaveClassButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCondensed: PropTypes.bool,
  isSaved: PropTypes.bool,
};

export const SaveRecipeButton = ({ onClick, isCondensed }) => {
  return (
    <BaseButton
      buttonColor="primary"
      borderColor="primary"
      textColor="white"
      text="Save Recipe"
      icon={`${config.publicFolderPath}/saveWhite.svg`}
      desktopSize="tiny"
      onClick={onClick}
      isCondensed={isCondensed}
    />
  );
};

SaveRecipeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCondensed: PropTypes.bool,
};

SaveRecipeButton.displayName = "SaveRecipeButton";

export const ScheduledButton = ({ border, className }) => {
  return (
    <BaseButton
      className={className}
      buttonColor="white"
      borderColor={border ? "primary" : "white"}
      textColor="primary"
      text="Scheduled"
      desktopSize="tiny"
      icon={`${config.publicFolderPath}/checkmark.svg`}
      onClick={() => {}}
    />
  );
};

ScheduledButton.propTypes = {
  border: PropTypes.bool,
  className: PropTypes.string,
};

ScheduledButton.displayName = "ScheduledButton";

export const SecondaryTextButton = ({
  className,
  onClick,
  border,
  text,
  deactivated,
  isCompressed = false,
}) => {
  return (
    <BaseButton
      className={className}
      buttonColor="white"
      borderColor={border ? "primary" : "white"}
      textColor="primary"
      desktopSize="tiny"
      text={text}
      onClick={onClick}
      deactivated={deactivated}
      isCompressed={isCompressed}
    />
  );
};

SecondaryTextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  border: PropTypes.bool,
  text: PropTypes.string.isRequired,
  deactivated: PropTypes.bool,
  isCompressed: PropTypes.bool,
  className: PropTypes.string,
};

SecondaryTextButton.displayName = "SecondaryTextButton";

export const PrimaryTextButton = ({
  id,
  className,
  onClick,
  text,
  deactivated,
}) => {
  return (
    <BaseButton
      id={id}
      className={className}
      buttonColor="primary"
      borderColor="primary"
      textColor="white"
      desktopSize="tiny"
      text={text}
      onClick={onClick}
      deactivated={deactivated}
    />
  );
};

PrimaryTextButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  deactivated: PropTypes.bool,
};

PrimaryTextButton.displayName = "PrimaryTextButton";

export const GradientTextButton = ({
  id,
  className,
  handler = () => {},
  text,
}) => {
  return (
    <BaseButton
      id={id}
      className={className}
      buttonColor="gradient"
      borderColor="white"
      textColor="white"
      desktopSize="tiny"
      text={text}
      onClick={handler}
    />
  );
};

GradientTextButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  handler: PropTypes.func,
  text: PropTypes.string.isRequired,
  deactivated: PropTypes.bool,
};

GradientTextButton.displayName = "GradientTextButton";

export const WatchButton = ({ onClick, text }) => {
  return (
    <StyledButton
      buttonColor="transparentBlack"
      borderColor="white"
      textColor="white"
      text={text}
      desktopSize="small"
      padding="large"
      onClick={onClick}
    />
  );
};

WatchButton.displayName = "WatchButton";

WatchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const StyledButton = styled(BaseButton)`
  height: 38px;
  &:before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 0 5px 8.7px;
    margin-right: 4px;
    border-color: transparent transparent transparent
      ${(p) => p.theme.colors.white};
  }
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    height: 54px;
    border-radius: 27px;
    border-width: 1.3px;
    &:before {
      margin-right: 5px;
      border-width: 6.5px 0 6.5px 11.3px;
    }
  }
`;

StyledButton.displayName = "StyledButton";

export const CloseButton = ({ onClick }) => {
  return (
    <BaseButton
      icon={`${config.publicFolderPath}/close.svg`}
      onClick={onClick}
      isIconOnly
    />
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

CloseButton.displayName = "CloseButton";

export const AddButton = ({
  className,
  onClick,
  position = "absolute",
  isListItem = false,
}) => {
  return (
    <StyledAddButton
      className={className}
      position={position}
      buttonColor={"white"}
      icon={`${config.publicFolderPath}/addItemPlus.svg`}
      onClick={onClick}
      isListItem={isListItem}
      isIconOnly
    />
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  position: PropTypes.string,
  className: PropTypes.string,
  isListItem: PropTypes.bool,
};

const LIST_ITEM_ADD = css`
  display: block;
  height: 20px;
  width: 20px;

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    height: 23px;
    width: 23px;
  }
`;

const StyledAddButton = styled(BaseButton)`
  position: ${(p) => p.position};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.colors.white};
  border: none;
  &:focus {
    outline: 0;
  }
  cursor: pointer;
  padding: ${(p) => p.theme.padding.none};
  ${(p) => p.isListItem && LIST_ITEM_ADD}
  img {
    ${(p) => p.isListItem && LIST_ITEM_ADD}
  }
`;

AddButton.displayName = "AddButton";

export const SearchButton = ({
  className,
  onClick,
  position = "absolute",
  alignment = "right",
}) => {
  return (
    <StyledSearchButton
      className={className}
      position={position}
      buttonColor={"white"}
      icon={`${config.publicFolderPath}/search.svg`}
      onClick={onClick}
      alignment={alignment}
      isIconOnly
    />
  );
};

SearchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  position: PropTypes.string,
  alignment: PropTypes.string,
  className: PropTypes.string,
};

const RIGHT_ALIGNED = css`
  right: 0;
`;

const LEFT_ALIGNED = css`
  left: 0;
`;

const StyledSearchButton = styled(BaseButton)`
  position: ${(p) => p.position};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.colors.white};
  border: none;
  &:focus {
    outline: 0;
  }
  cursor: pointer;
  padding: ${(p) => p.theme.padding.none};
  ${(p) => (p.alignment === "right" ? RIGHT_ALIGNED : LEFT_ALIGNED)}
`;

SearchButton.displayName = "SearchButton";
