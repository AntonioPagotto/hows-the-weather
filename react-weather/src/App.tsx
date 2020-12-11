import React, { useState } from 'react';
import { Weather } from './models/Weather';

const api = {
  key: "2dd1b7f777237a53fa47dd63b7cc873c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<Weather | any>('');

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

  const dateBuilder = (d: any) => {
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Pesquisar..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div>
          <div className="location-box">
            <div className="location">{weather.name}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {weather.main.temp}ºC
            </div>
            <div className="weather">
              Limpo
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
