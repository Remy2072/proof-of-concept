// Import necessary npm packages
import express from "express";
import fetchJson from "./helpers/fetch-json.js";

// Define API URLs
const apiUrl = "https://dtnl-frontend-case.vercel.app/api/";

// Create a new express app
const app = express();

// Set ejs as the template engine and define views directory
app.set("view engine", "ejs");
app.set("views", "./views");

// Serve static resources from 'public' directory
app.use(express.static("public"));

// Enable URL-encoded data parsing
app.use(express.urlencoded({ extended: true }));

// Define the route for the home page
app.get("/", async function (request, response) {
    const forecast = await fetchJson(apiUrl + "/get-forecast");
    const weather = await fetchJson(apiUrl + "/get-weather");
    const activities = await fetchJson(apiUrl + "/get-things-to-do");

    if (Array.isArray(forecast.forecast)) {
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        forecast.forecast.forEach((forecast) => {
            const date = new Date(forecast.date);
            const dayIndex = date.getUTCDay();
            forecast.dayOfWeek = daysOfWeek[dayIndex];
        });
        console.log(forecast);
    }

    response.render("index", {
        weather2: weather.weatherInfo,
        weather3: weather.temperature,
        forecast2: forecast.forecast,
        forecast: forecast.forecast || [],
        activities2: activities.activities,
    });
});

// Set the port number for the express app
const port = process.env.PORT || 8000;
app.set("port", port);

// Start the express server and log the port number
app.listen(port, () => {
    console.log(`Application started on http://localhost:${port}`);
});
