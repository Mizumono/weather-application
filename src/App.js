import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import axios from 'axios';

const App = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [geolocationStatus, setGeolocationStatus] = useState();

  const [currentWeather, setCurrentWeather] = useState();

  useEffect(() => {
    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setGeolocationStatus('Success!');
        }, error => setGeolocationStatus(error.message))
      : setGeolocationStatus('Geolocation is not supported by this browser!');
  }, []);

  useEffect(() => {
    latitude && longitude && axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={API key}&units=metric`)
    .then(({data}) => {
      setCurrentWeather(data);
    })
    .catch(error => {
      console.warn(error);
    });
  }, [latitude, longitude])

  return (
    <div className={styles.app}>
      <p>Weather Application</p>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>geolocationStatus: {geolocationStatus}</p>
      <p>Name: {currentWeather && currentWeather.name}</p>
      <p>Temp: {currentWeather && currentWeather.main.temp}</p>
    </div>
  );
}

export default App;
