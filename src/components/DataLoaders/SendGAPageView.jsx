"use client";

import { useEffect } from "react";
import ReactGA from "react-ga4";

const SendGAPageView = ({ pageTitle, selectedCity, blog_id, event_id }) => {
  useEffect(() => {

    ReactGA.initialize([
      {
        trackingId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
        gaOptions: { send_page_view: false },
      },
    ]);

    let gaEvent = {
      hitType: "pageview",
      page: window.location.href,
      title: pageTitle,
    };

    if (typeof selectedCity !== "undefined") {
      gaEvent["city_name"] = selectedCity.name;
    }

    if (typeof blog_id !== "undefined") {
      gaEvent["blog_id"] = blog_id;
    }

    if (typeof event_id !== "undefined") {
      gaEvent["event_id"] = event_id;
    }

    ReactGA.send(gaEvent);

  }, []);

  return null;
};

export default SendGAPageView;
