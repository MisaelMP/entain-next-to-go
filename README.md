# Next to Go Races App

## Overview

The Next to Go Races App is a single-page application (SPA) designed to display upcoming races from 3 categories. It allows users to view the next five races per category, sorted by start time, with a countdown timer. Races are automatically removed one minute after they start, and the app fetches new races to maintain a minimum of five races per category.

## Features

- Displays the next five races per category.
- Filters races by category.
- Removes expired races (races that have started more than a minute ago).
- Automatically fetches more races to ensure a minimum of five races per category.
- Responsive design using Tailwind CSS.

## Installation

### Prerequisites

- Node.js (>=14.x)
- npm or yarn

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/next-to-go-races.git
   cd next-to-go-races
   ```

2. ```sh
   npm install
   ```

3. Create a `.env` file on the root directory and add the following
   `VITE_API_URL=https://api.neds.com.au/rest/v1/racing/`

4. Start Development server

```sh
npm run dev
```

### Testting

The app uses Vitest for testing. Just run

```sh
npm run test:unit
```

### License

This project is licensed under the MIT License.
