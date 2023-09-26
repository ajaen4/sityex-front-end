import { analytics } from "db";
import { logEvent } from "firebase/analytics";

export const logAnalyticsEvent = (event_type, event_data) => {
  logEvent(analytics, event_type, event_data);
};
