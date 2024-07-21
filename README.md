# Next to Go Races App

## Overview

The Next to Go Races App is a single-page application (SPA) that displays upcoming races from different categories, It allows users to see the next five races per category, sorted by start time with countdown and auto fetching new races.

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

### License

This project is licensed under the MIT License.
