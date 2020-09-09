import moment from "moment";

export const getCalendarInvite = (startTime, classId, title, url) => {
  var momentDate = moment(startTime);
  var startDate = momentDate.format("YYYYMMDD[T]HHmmss");
  var endDate = momentDate.add(1, "hours").format("YYYYMMDD[T]HHmmss");

  const icsHeader = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:${classId}\r\n`;
  const timezoneEST =
    "BEGIN:VTIMEZONE\r\nTZID:America/New_York\r\nLAST-MODIFIED:20050809T050000Z\r\nBEGIN:STANDARD\r\nDTSTART:20071104T020000\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nDTSTART:20070311T020000\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE\r\n";
  const uid = "BEGIN:VEVENT\r\nUID:" + classId + "\r\n";
  const timestamp = "DTSTAMP:" + startDate + "\r\n";
  const start = "DTSTART:" + startDate + "\r\n";
  const end = "DTEND:" + endDate + "\r\n";
  const summary = "SUMMARY:Live Class - " + title + "\r\n";
  const location = "LOCATION:https://kitchen.foodnetwork.com\r\n";
  const description = "DESCRIPTION:" + `Class details: ${url}` + "\r\n";
  const reminder =
    "BEGIN:VALARM\r\nTRIGGER:-PT60M\r\nACTION:DISPLAY\r\nDESCRIPTION:Your class begins in 1 hour\r\nEND:VALARM\r\n";
  const icsFooter = "END:VEVENT\r\nEND:VCALENDAR";

  const icsBody =
    icsHeader +
    timezoneEST +
    uid +
    timestamp +
    description +
    start +
    end +
    summary +
    location +
    reminder +
    icsFooter;

  window.open("data:text/calendar;charset=utf8," + escape(icsBody));

  return icsBody;
};

export const getMinutesUntilDate = (isoDate) => {
  const event = new Date(isoDate);
  const now = new Date(Date.now());
  const diff = event - now;
  const diffMins = Math.floor(diff / 60e3);
  return diffMins;
};

export const getMinutesSecondsUntilTime = (isoDate) => {
  const difference = new Date(new Date(isoDate) - new Date(Date.now()));
  let time = { minutes: 0, seconds: "00" };
  let seconds = difference.getSeconds();
  time = {
    minutes: Math.floor(difference / 60e3),
    seconds: seconds > 9 || seconds < 0 ? seconds : `0${seconds}`,
  };

  return time;
};

export const formatSeconds = (timeInSeconds) => {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
};

export const groupClassesByDate = (classes) => {
  const dateMap = new Map();
  let dateKey;
  const date = new Date();
  const utcOffset = date.getTimezoneOffset();
  let startTimeWithOffset;

  classes.forEach((liveClass) => {
    if (liveClass === null) return;
    startTimeWithOffset = moment(liveClass.startTime)
      .utcOffset(-utcOffset)
      .format();
    dateKey = startTimeWithOffset.split("T")[0];
    if (!dateMap.has(dateKey)) {
      dateMap.set(dateKey, []);
    }
    dateMap.get(dateKey).push(liveClass);
  });

  return dateMap;
};
