import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import axios from 'axios';
import Card from './components/Card/Card';

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
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Card>
            <Card.Header>Local Weather Widget</Card.Header>
            <Card.Body>Body</Card.Body>
            <Card.Footer>Footer</Card.Footer>
          </Card>
        </div>
        <div className={styles.col}>
          <Card>
            <Card.Header>Global Weather Widget</Card.Header>
            <Card.Body>Body</Card.Body>
            <Card.Footer>Footer</Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
