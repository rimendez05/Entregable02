import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import Weather from './components/Weather'
import Loader from './components/Loader'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()

  const success = (position) => {
    const currentCoordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    }
    setCoords(currentCoordinates)
  }

  useEffect (() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
   if(coords) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=d316ff5532801d2e354540cfd26d20ab`

    axios.get(URL)
      .then((res) => {
        setWeather(res.data)
        const celsius = (res.data.main.temp - 273.15).toFixed(1)
        const fahrenheit = (celsius * 1.8 + 32).toFixed(1)
        const newTemps = {
         celsius,
         fahrenheit
        }
        setTemp(newTemps)
      })
      .catch((err) => console.log(err));
   }
  }, [coords])

  return (
    <div className="App flex justify-center items-center min-h-screen bg-[url('/images/bg2.jpg')] bg-cover px-2">
      {
        weather ? (
          <Weather weather={weather} temp={temp} />
        ) : (
          <Loader />
          
        )
      }
     
    </div>
  )
}

export default App
