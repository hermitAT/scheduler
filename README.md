# Interview Scheduler

## Overview

Interview Scheduler is a React application that allows users to book and cancel interviews. We combine a concise API with a WebSocket server to build a realtime experience.

# Main Features

i. Interview Scheduler is a single page application in which the client communicated with an API server over HTTP, using the JSON format. Data is persisted using a PostgreSQL database.

ii. A user can switch between days, and on timeslots that are empty the user can click on an 'Add' buton to render a form used to collect the data needed to create a new interview appointment, pending validation.

iii. The user can edit details and cancel this interview once booked, being prompted with confirmation messages when the user attempts to cancel the appointment.

iii. After each booking and cancellation, the state is updated throughout the app, ensuring no stale states exist as the user navigates through the app.

## Screenshots

!["Empty appointments."]()

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress E2E Testing Framework

```sh
npm run cypress
```
