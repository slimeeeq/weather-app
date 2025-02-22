document.getElementById("get-weather-btn").addEventListener("click", getWeather);

function getWeather() {
  const cityName = document.getElementById("city-input").value.trim();  // Trim to avoid extra spaces
  
  if (cityName) {
    const apiKey = "you-on-api-key";  // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data. Status: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data.cod !== 200) {
          alert("City not found or invalid request.");
        } else {
          displayWeather(data);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);  // Log any fetch or API errors
        alert("There was an issue fetching the weather data. Please try again.");
      });
  } else {
    alert("Please enter a city name.");
  }
}

function displayWeather(data) {
  const city = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;

  // Display the weather details
  document.getElementById("city-name").innerText = city;
  document.getElementById("temp").innerText = `Temperature: ${temperature}°C`;
  document.getElementById("description").innerText = `Condition: ${description}`;
}
