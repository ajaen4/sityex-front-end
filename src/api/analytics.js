import { analytics } from "db";

import { logEvent, isSupported } from "firebase/analytics";

export const logAnalyticsEvent = (event_type, event_data) => {
  isSupported().then((yes) =>
    yes ? logEvent(analytics, event_type, event_data) : null
  );
};
