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

app.get("/", async function (request, response) {
    const forecast = await fetchJson(apiUrl + "/get-forecast");
    const weather = await fetchJson(apiUrl + "/get-weather");
    const activities = await fetchJson(apiUrl + "/get-things-to-do");

    if (forecast.forecast.metric === "FAHRENHEIT") {
        // Convert Fahrenheit to Celsius and round to the nearest integer
        forecast.forecast.minTemp = Math.round(((forecast.forecast.minTemp - 32) * 5) / 9);
        forecast.forecast.maxTemp = Math.round(((forecast.forecast.maxTemp - 32) * 5) / 9);
        console.log(forecast.forecast.minTemp);
    }
    
    if (weather.temperature.metric === "FAHRENHEIT") {
        // Convert Fahrenheit to Celsius
        weather.temperature.temp = ((weather.temperature.temp - 32) * 5) / 9;
        // Round the temperature to the nearest integer
        weather.temperature.temp = Math.round(weather.temperature.temp);
    }

    const updatedWeatherInfo = weather.weatherInfo.map((info) => {
        const titleWithTemp = info.title
            .replace("{{ CELCIUS }}", "~ " + weather.temperature.temp)
            .replace("°C", " °");
        return { ...info, title: titleWithTemp };
    });

    weather.weatherInfo = updatedWeatherInfo;

    if (Array.isArray(forecast.forecast)) {
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
        ];

        forecast.forecast.forEach((forecast) => {
            // Get the date of forecast
            const d = new Date(forecast.date);
            // Get the day of forecast
            const day = days[d.getUTCDay()];
            // Get the date of forecast
            const date2 = d.getDate(forecast.date);
            // Get the month of forecast
            const month = months[d.getMonth()];
            forecast.dayOfWeek = day + " " + date2 + "th " + month;
        });
    }

    response.render("index", {
        weather2: weather.weatherInfo,
        weather3: weather.temperature,
        forecast2: forecast.forecast,
        forecast: forecast.forecast || [],
        activities2: activities.activities,
    });
});

app.post("/post-subscribe", function(request, response) {

    const email = request.body.email;

    console.log(email)
    response.render("applied", {e: email})
})

// Set the port number for the express app
const port = process.env.PORT || 8000;
app.set("port", port);

// Start the express server and log the port number
app.listen(port, () => {
    console.log(`Application started on http://localhost:${port}`);
});