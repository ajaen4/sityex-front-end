import posthog from "posthog-js";

export const postHogClient = posthog.init(
  process.env.NEXT_PUBLIC_POSTHOG_API_KEY,
  {
    api_host: "https://eu.posthog.com",
  }
);

let ReactPixel;
const options = {
  autoConfig: true,
  debug: process.env.NEXT_PUBLIC_PROJECT_ID == "sityex-dev",
};

if (typeof window !== "undefined") {
  ReactPixel = require("react-facebook-pixel").default;
  ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID, options);
}

export { ReactPixel };
