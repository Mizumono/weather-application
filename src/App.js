import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Card from './components/Card/Card';
import LocalWeather from './widgets/LocalWeather/LocalWeather';

const App = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [geolocationStatus, setGeolocationStatus] = useState();

  useEffect(() => {
    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setGeolocationStatus('Success!');
        }, error => setGeolocationStatus(error.message))
      : setGeolocationStatus('Geolocation is not supported by this browser!');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <LocalWeather
            latitude={latitude}
            longitude={longitude}
          />
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
