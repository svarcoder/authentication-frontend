# React.js Frontend with TypeScript, Tailwind CSS

This is a React.js frontend application built with TypeScript and Tailwind CSS. The application features form submission which interacting with an Express.js backend.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Features

- Normal UI
- User Form Submission
- Tailwind CSS for styling
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/svarcoder/authentication-frontend.git
   cd skinyou-frontend
   ```

2.Install dependencies:

```sh
npm install
# or
yarn install
```

3. Create a .env.local file in the root directory and add the following environment variables:

```sh
REACT_APP_BASE_URL=""
REACT_APP_SECRET=""
REACT_APP_SITE_KEY=""
```

4. Start the development server:

```sh
   npm start
   # or
   yarn start
```

### Project Structure

```sh
├── public
│ └── ...
├── src
│ ├── api
│ ├── components
│ │   ├── dashboard
│ │   ├── lead
│ │   ├── login
│ │   ├── password
│ │   ├── profile
│ │   ├── ProvateRoute.tsx
│ │   ├── Route.tsx
│ ├── context
├── .env
├── .gitignore
├── package.json
├── README.md # Project documentation
└── tsconfig.json # TypeScript configuration
```

### Scripts

test: Runs test for testcases.
build: Builds the application for production.
start: Starts the production server.
eject: Runs eject for eject.

### Environment Variables

REACT_APP_BASE_URL: The base URL of the Express.js backend API.
REACT_APP_SECRET: v2 captcha secret
REACT_APP_SITE_KEY: v2 captcha site key
