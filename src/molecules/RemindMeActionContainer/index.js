import { useState } from "react";
import PropTypes from "prop-types";
import { useLocalStorage, getCalendarInvite } from "/utils";
import { RemindMeButton } from "/atoms";

// TODO: this should be prevented from running on the server.
const RemindMeActionContainer = ({
  className,
  startTime,
  classId,
  title,
  url,
  border,
  isCompressed = false,
}) => {
  const [scheduledClasses, setScheduledClasses] = useLocalStorage(
    "scheduledClasses",
    []
  );
  const [isScheduled, setIsScheduled] = useState(
    scheduledClasses.indexOf(classId) >= 0
  );

  const handleRemindMe = (e) => {
    e.preventDefault();

    // download calendar reminder
    getCalendarInvite(startTime, classId, title, url);

    // set button state to scheduled and store id in Local Storage
    const newScheduledClasses = [...scheduledClasses, classId];
    setScheduledClasses(newScheduledClasses);
    setIsScheduled(true);
  };

  return (
    <RemindMeButton
      className={className}
      isCompressed={isCompressed}
      isScheduled={isScheduled}
      handler={handleRemindMe}
      border={border}
    />
  );
};

RemindMeActionContainer.propTypes = {
  startTime: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  border: PropTypes.bool,
  isCompressed: PropTypes.bool,
  className: PropTypes.string,
};

export default RemindMeActionContainer;

RemindMeActionContainer.displayName = "RemindMeActionContainer";
