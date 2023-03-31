import './App.css';
import { useState, useEffect, useCallback } from 'react';
import Search from  './components/Search'
import WeatherDisplay from './components/Weather';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [found, setFound] = useState(false);

  const api = useCallback(()=>{
    
  }, [city])

  useEffect(()=>{
      if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=be7c2643f6fe0c32eb7fe5035e5c8aa5`)
        .then(response => response.json())
        .then(data => {
          if (data.cod === 200){
            setFound(true);
            setWeather({
              city: data.name, 
              country: data.sys.country, 
              status: data.weather[0].main, 
              temperature: data.main.temp
            })
          }else{
            setFound(false)
          }
        })
        .catch(err=>console.log(err))
      }
  }, [city, api,]);

  return (
    <div className="App">
      <Search searchValue={city} onSearching={setCity}/>
      <div>
        {weather && <WeatherDisplay found={found} city={weather.city} country={weather.country} status={weather.status} temperature={weather.temperature}/>}
      </div>
    </div>
  );
}

export default App;
