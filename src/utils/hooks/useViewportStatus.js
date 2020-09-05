import { useState, useEffect } from "react";

const checkQuery = (evt) => evt && evt.matches;

export const useViewportStatus = (mediaQuery) => {
  const mediaQueryList =
    typeof window !== "undefined" ? window.matchMedia(mediaQuery) : false;
  const [viewportStatus, setViewportStatus] = useState(
    checkQuery(mediaQueryList)
  );

  const getViewportStatus = (evt) => {
    setViewportStatus(checkQuery(evt));
  };

  useEffect(() => {
    if (mediaQueryList) {
      mediaQueryList.addListener(getViewportStatus);
      return () => {
        mediaQueryList.removeListener(getViewportStatus);
      };
    }
  }, []);
  return [viewportStatus];
};
