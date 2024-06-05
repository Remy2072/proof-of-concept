// Import necessary npm packages
import express from 'express';
import fetchJson from './helpers/fetch-json.js';

// Define API URLs
const apiUrl = 'https://dtnl-frontend-case.vercel.app/api/';
const forecastUrl = `${apiUrl}get-forecast`;
const currentWeatherUrl = `${apiUrl}get-weather`;
const thingsToDoUrl = `${apiUrl}get-things-to-do`;

// Create a new express app
const app = express();

// Set ejs as the template engine and define views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static resources from 'public' directory
app.use(express.static('public'));

// Enable URL-encoded data parsing
app.use(express.urlencoded({ extended: true }));

// Define the route for the home page
app.get('/', async (req, res) => {
  try {
    const [forecastData, currentWeatherData, thingsToDoData] = await Promise.all([
      fetchJson(forecastUrl),
      fetchJson(currentWeatherUrl),
      fetchJson(thingsToDoUrl)
    ]);

    res.render('index', {
      allcast: forecastData.forecast || [],
      weather: currentWeatherData.temperature || [],
      weatherinfo: currentWeatherData.weatherInfo || {},
      thingsToDo: thingsToDoData.activities || []
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data.');
  }
});

// Set the port number for the express app
const port = process.env.PORT || 8000;
app.set('port', port);

// Start the express server and log the port number
app.listen(port, () => {
  console.log(`Application started on http://localhost:${port}`);
});
