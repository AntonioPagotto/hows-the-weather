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
      console.log(weather)
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

  // switch(background) {

  //   case 'undefined':
  //     background = 'app';
  //     break;

  //   case 'Clouds':
  //     background = 'app.shower';
  //     break;

  //   default:
  //     background = 'app';

  // (typeof weather.weather[0].id == 800) ? 'app' : ((weather.weather[0].id > 800) ? 'app.broken'
  //   : weather.weather[0].id >= 700 && weather.weather[0].id < 800 ? 'app.mist'
  //     : weather.weather[0].id >= 600 && weather.weather[0].id < 700 ? 'app.snow'
  //       : weather.weather[0].id >= 500 && weather.weather[0].id < 600 ? 'app.shower'
  //         : weather.weather[0].id >= 300 && weather.weather[0].id <= 321 ? 'app.rain'
  //           : weather.weather[0].id >= 200 && weather.weather[0].id <= 232 ? 'app.thunderstom'
  //             : 'app'

  const dateBuilder = (d: any) => {
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} de ${year}`
  }

  return (
    <div className={renderBg(weather)}>
      <main>
        <div className="container">
          <div className="title">
            COMO ESTÁ O CLIMA?
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
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.floor(weather.main.temp)}ºC
            </div>
                <div className="container-var">
                  <div className="min-temp">
                    MIN
                  <h1>{Math.floor(weather.main.temp_min)}ºc</h1>
                  </div>
                  <div className="max-temp">
                    MAX
                  <h1>{Math.floor(weather.main.temp_max)}ºc</h1>
                  </div>
                </div>
                <div className="weather">
                  {(weather !== undefined)? weather?.weather[0].main : ''}
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
