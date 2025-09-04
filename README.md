# HN scraper
This website is built using Vite + React.
It uses CORS to fetch data from the Hacker News Website and with JSON DOM Parser it parses the data and displays it in a user-friendly manner.

## Features
- Fetches data from Hacker News
- Displays title, URL, number of comments, and votes
- Buttons to filter stories based on word count in the title. and then sort according to votes or comments.
- Logs user actions like filtering and URL clicks into local storage.
- Show logs button to view user actions.
- Clear logs button to clear user actions.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/gsingh704/hn_scraper
    ```
2. Navigate to the project directory:
    ```bash
    cd hn-scraper
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open your browser and go to `http://localhost:5173` to view the application.