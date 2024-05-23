<p align="center">
<img src="https://d1dshnpqadx0e7.cloudfront.net/images/logos/big_logo_blue.png">
</p>

# SityEx

## Introduction

[SityEx](https://sityex.com) is a one-stop platform for expats living in Madrid, Spain.This project's objective is to contain all the front-end development and the CI/CD to deploy to Vercel.

## Tech Stack

 Technologies used:

- React
- Redux
- Mapbox
- Next.js
- Vercel
- Sentry
- PostHog
- Firebase
- Meta Ads

## Requirements

- You must own a Firebase, Vercel, PostHog, Meta Ads and Sentry account.
- For local deployment you must have a file named .env in the root path with the following variables:

```bash
## Firebase env variables
NEXT_PUBLIC_API_KEY=
# When running locally it has to point to the default domain
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_MESSAGING_SENDER_ID=
NEXT_PUBLIC_DATABASE_URL=
NEXT_PUBLIC_APP_ID=
NEXT_PUBLIC_MEASUREMENT_ID=
# Mapbox environment variables
NEXT_PUBLIC_MAPS_API_KEY=
NEXT_PUBLIC_MAPS_STYLE=
NEXT_PUBLIC_MAPS_STREET_STYLE=
NEXT_PUBLIC_PLACES_API_KEY=
# User behaviour/monitoring env variables
NEXT_PUBLIC_POSTHOG_API_KEY=
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=
NEXT_PUBLIC_SENTRY_DSN_URL=
NEXT_PUBLIC_SENTRY_ORG=
NEXT_PUBLIC_SENTRY_PROJECT=

# BELOW VARS ARE ONLY NEEDED TO TEST CI/CD LOCALLY

## Has to be set locally even though it is inferred in the CI/CD pipeline
## for the client code to read it locally when testing
NEXT_PUBLIC_SENTRY_DEPLOY_ENVIRONMENT=
# GCP credentials to deploy to Firebase
GCP_SA_KEY_BASE_64=
# Vercel
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
VERCEL_TOKEN=
# Sentry
SENTRY_AUTH_TOKEN=
SENTRY_LOG_LEVEL=

```

- Versions:
    - React 18.0.0
    - Next 14.0.2
    - Redux 9.0.2

## Installation

First, you will need to [install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) node and npm.

To test locally you will need to install the dependencies and run the local development server:

```bash
npm i
npm run dev
```

# Project Structure

The project's structure is the following:

- .github: GitHub Actions workflows.
- public: static files.
- src: React and Next.js code.
