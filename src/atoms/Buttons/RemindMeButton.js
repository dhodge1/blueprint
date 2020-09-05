import PropTypes from "prop-types";
import { SecondaryTextButton } from "/atoms";
import { ScheduledButton, BaseButton } from "/atoms/Buttons";
import config from "/config";

const RemindMeButton = ({
  className,
  isScheduled,
  handler = () => {},
  border,
  isLocked,
  isCompressed = false,
}) => {
  if (isLocked) {
    const lockedHandler = () => {
      handler();
      window.location.href = "/";
    };

    return (
      <BaseButton
        className={className}
        buttonColor="white"
        borderColor={border ? "primary" : "white"}
        textColor="primary"
        text="Remind Me"
        icon={`${config.publicFolderPath}/buttonLock.svg`}
        desktopSize="tiny"
        onClick={lockedHandler}
      />
    );
  }
  if (isScheduled)
    return <ScheduledButton className={className} border={border} />;
  return (
    <SecondaryTextButton
      className={className}
      isCompressed={isCompressed}
      text="Remind Me"
      onClick={handler}
      border={border}
    />
  );
};

RemindMeButton.propTypes = {
  handler: PropTypes.func,
  isScheduled: PropTypes.bool,
  isLocked: PropTypes.bool,
  border: PropTypes.bool,
  isCompressed: PropTypes.bool,
  className: PropTypes.string,
};

export default RemindMeButton;

RemindMeButton.displayName = "RemindMeButton";
