# Dashboard Application

This application provides a dashboard to visualize various types of data using charts like line charts, bar charts, pie charts, and candlestick charts. The application is built using React with the help of several charting libraries and Axios for data fetching.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Libraries and Tools Used](#libraries-and-tools-used)
- [Approach and Thought Process](#approach-and-thought-process)

## Setup Instructions

### Extract the Zip File

Download and extract the provided zip file.

### Install Dependencies

Ensure you have Node.js and npm installed on your machine. Then, navigate to the project directory (frontend)in your terminal and run:

```bash
npm install
```

This command will install all the necessary dependencies required to run the application.

Run the application

### Start development server

cd blockhouse/blockhouse -> blockhouse (backend): `bash python manage.py startapp api `

cd frontend -> frontend (frontend): `bash npm run dev`

The application should now be running on http://localhost:3000.

## Backend API:

Make sure your backend API is running and accessible at http://127.0.0.1:8000/. The frontend fetches data from this API endpoint, so ensure the endpoints (/api/candlestick-data/, /api/line-chart-data/, /api/bar-chart-data/, /api/pie-chart-data/) are correctly configured and available.

## Libraries and Tools Used

### The following libraries and tools are used in this project:

React: A JavaScript library for building user interfaces.
Recharts: A composable charting library built on React components.
Axios: A promise-based HTTP client for making API requests.
pi-lib/candlestick: A library for rendering candlestick charts in React.

## Approach and Thought Process

### Chart Integration

The application uses the Recharts library for rendering line, bar, and pie charts. Recharts is chosen due to its simplicity and ease of use when working with React. Each chart type is configured with props to match the expected data format.

### For the candlestick chart

pi-lib/candlestick is used as it provides a simple and effective way to visualize stock data or other similar time series data. The candlestick chart integrates seamlessly with the React component structure.

### Data Fetching

Data for each chart is fetched from a backend API using Axios. The data is fetched asynchronously within a useEffect hook to ensure it is loaded when the component mounts. Each dataset is then formatted to fit the requirements of the respective chart type.

### Component Layout

The dashboard is structured using a grid layout that adapts to different screen sizes, providing a responsive design. Each chart is wrapped in a styled container to maintain consistency across the dashboard.

### Error Handling

Basic error handling is implemented during the data fetch process to catch and log any errors that occur. This helps in debugging and ensures that any issues with data fetching do not crash the application.

### Scalability

The application is designed to be easily extendable. New chart types or data sources can be added with minimal changes to the existing codebase. Each chart component is modular, making it straightforward to add, remove, or modify charts as needed.
