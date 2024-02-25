import posthog from "posthog-js";

export const postHogClient = posthog.init(
  process.env.NEXT_PUBLIC_POSTHOG_API_KEY,
  {
    api_host: "https://eu.posthog.com",
  },
);
