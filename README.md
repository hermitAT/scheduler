# Interview Scheduler

## Overview

Interview Scheduler is a single page application built with React in which the client communicated with an API server over HTTP, using the JSON format.

---

# Main Features


i. A user can switch between days, and on timeslots that are empty the user can click on an 'Add' buton to render a form used to collect the data needed to create a new interview appointment, pending validation.

ii. The user can edit details and cancel this interview once booked, being prompted with confirmation messages when the user attempts to cancel the appointment.

ii. After each booking and cancellation, the state is updated throughout the app, ensuring no stale states exist as the user navigates through the app.

iv. Data is persisted using a PostgreSQL database.

---

## Screenshots

!["Empty appointments."](https://raw.githubusercontent.com/hermitAT/scheduler/master/docs/Empty.png)
!["Showing full appointments."](https://raw.githubusercontent.com/hermitAT/scheduler/master/docs/Show.png)
!["Showing form."](https://raw.githubusercontent.com/hermitAT/scheduler/master/docs/Form.png)
!["Form validation in action."](https://raw.githubusercontent.com/hermitAT/scheduler/master/docs/FormValidation.png)
!["Saving..."](https://raw.githubusercontent.com/hermitAT/scheduler/master/docs/Saving.png)
!["Confirm deletion."](https://raw.githubusercontent.com/hermitAT/scheduler/master/docs/Confirm.png)
!["Deleting..."](https://raw.githubusercontent.com/hermitAT/scheduler/master/docs/Deleting.png)

---

## dependencies && dev dependencies

```sh
"dependencies":
    "axios": "^0.21.0",
    "classnames": "^2.2.6",
    "normalize.css": "^8.0.1",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-scripts": "3.0.0"

"devDependencies":
    "@babel/core": "^7.4.3",
    "@storybook/addon-actions": "^5.0.10",
    "@storybook/addon-backgrounds": "^5.0.10",
    "@storybook/addon-links": "^5.0.10",
    "@storybook/addons": "^5.0.10",
    "@storybook/react": "^5.0.10",
    "@testing-library/jest-dom": "^4.0.0",
    "@testing-library/react": "^8.0.7",
    "@testing-library/react-hooks": "^3.7.0",
    "babel-loader": "^8.0.5",
    "node-sass": "^4.12.0",
    "prop-types": "^15.7.2",
    "react-test-renderer": "^16.9.0"
```

---

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
