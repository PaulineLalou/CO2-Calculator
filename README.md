## Distance Calculator CO2 Test
This is a simple web application that calculates the CO2 emissions based on the distance traveled and the transportation mode chosen. It allows users to input an origin and destination address, select a transportation mode (Car or Plane), and calculates the distance and CO2 emissions accordingly.

## Features
Input origin and destination addresses
Select transportation mode (Car or Plane)
Calculate distance and CO2 emissions
Display the calculated distance in kilometers
Display the calculated CO2 emissions in kilograms
Error handling for invalid inputs or calculation errors

## Technologies Used
React: JavaScript library for building user interfaces
Redux Toolkit: State management library for React applications
Axios: HTTP client for making API requests
Google Maps JavaScript API: Provides geocoding and distance matrix services
Cypress: JavaScript end-to-end testing framework
TypeScript: Typed superset of JavaScript

## Prerequisites
Before running the application, make sure you have the following installed:

Node.js: JavaScript runtime environment
npm: Package manager for Node.js (automatically installed with Node.js)

## Getting Started
Clone the repositorya nd the dependencies:
npm install

Obtain a Google Maps API key:

Visit the Google Cloud Platform Console.
Create a new project or select an existing project.
Enable the Distance Matrix API and Places API for the project.
Generate an API key.
Replace the placeholder API key in DistanceCalculator.tsx with your API key.
Start the development server:

npm start

Open your browser and visit http://localhost:3000 to see the application.

## Testing
The application includes end-to-end tests using Cypress. To run the tests, use the following command:

npx cypress open 

Cypress will open a test runner window and execute the tests.
You can also select E2E testing and click on spec.

## Contributing
Contributions to this project are welcome. If you find any bugs or want to suggest enhancements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.