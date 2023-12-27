"use client";

import { useEffect } from "react";
import { logAnalyticsEvent } from "api";

const SendGAPageView = ({ pageTitle, selectedCity, blog_id, event_id }) => {
  useEffect(() => {
    let pageView = {
      page_title: pageTitle,
      page_location: window.location.href,
    };

    if (selectedCity) {
      pageView.city_name = selectedCity.name;
    }

    if (blog_id) {
      pageView.blog_id = selectedCity.blog_id;
    }

    if (event_id) {
      pageView.event_id = event_id;
    }

    logAnalyticsEvent("page_view", pageView);

  }, [selectedCity, blog_id, event_id]);

  return null;
};

export default SendGAPageView;
