# WebServiceIMC

This is a simple web service project that calculates the Body Mass Index (BMI) of a person based on their height and weight. The project is built using Node.js, Express, and Vue.js.

The server-side of the application is built using the Express framework for Node.js. It handles the BMI calculation and provides an API endpoint that accepts height and weight values and returns the corresponding BMI value and health status.

The client-side of the application is built using Nuxt.js. It provides a simple user interface where users can enter their height and weight values and see their corresponding BMI value and health status.


Features

- Calculates the BMI value and health status of a person based on their height and weight
- Provides an API endpoint for BMI calculation
- Simple user interface built using Nuxt.js


Installation

- Clone the repository
- Navigate to the project directory
- Run npm install to install dependencies
- Run npm run dev to start the development server


Usage

- Navigate to http://localhost:3000 in your web browser
- Enter your height and weight values
- Click the "Calculate" button to see your BMI value and health status

You can also make a POST request to the API endpoint http://localhost:3000/api/bmi with a JSON body containing the height and weight values, and receive a response with the corresponding BMI value and health status.


License

This project is licensed under the MIT License. See the LICENSE file for more details
