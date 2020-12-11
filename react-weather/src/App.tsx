import React, { useEffect, useState } from 'react';
import { Weather } from './models/Weather';

const api = {
  key: "2dd1b7f777237a53fa47dd63b7cc873c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<Weather | undefined>(undefined);

  const search = (evt: any) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(results =>
          setWeather(results));
      setQuery('');
    }
  }

  const renderBg = (weather: any) => {
    switch (weather?.weather[0]?.main) {
      case undefined:
        return 'app';
      case 'Thunderstorm':
        return 'app thunderstorm';
      case 'Drizzle':
        return 'app thunderstorm';
      case 'Rain':
        return 'app rain';
      case 'Snow':
        return 'app snow';
      case 'Mist':
        return 'app mist';
      case 'Clear':
        return 'app bg';
      case 'Clouds':
        return 'app broken';
      default:
        return 'app';
    }
  }

  return (
    <div className={renderBg(weather)}>
      <main>
        <div className="container">
          <div className="title">
            HOWS <span className="primary-color">THE</span> WEATHER?
        </div>
          <div className="search-box">
            <input type="text" className="search-bar" placeholder="Insira a cidade..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {(weather?.main !== undefined) ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.floor(weather.main.temp)}ºC
            </div>
                <div className="container-var">
                  <div className="min-temp">
                    <p className="primary-color">MIN</p>
                  <h1>{Math.floor(weather.main.temp_min)}ºc</h1>
                  </div>
                  <div className="max-temp">
                  <p className="primary-color">MAX</p>
                  <h1>{Math.floor(weather.main.temp_max)}ºc</h1>
                  </div>
                </div>
                <div className="weather">
                  <h4>
                    {(weather !== undefined) ? weather?.weather[0].main : ''}
                  </h4>
                  <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} />
                </div>
              </div>
            </div>
          ) : ('')}
        </div>
      </main>
    </div>
  );
}

export default App;
