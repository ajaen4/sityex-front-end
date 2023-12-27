import { analytics } from "db";

import { logEvent } from "firebase/analytics";

export const logAnalyticsEvent = (event_type, event_data) => {
  if (typeof analytics === "undefined") {
    logEvent(analytics, event_type, event_data);
  } else {
    console.log("Analytics not supported");
  }
};
