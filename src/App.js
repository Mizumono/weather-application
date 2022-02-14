import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import LocalWeather from './widgets/LocalWeather/LocalWeather';
import WorldWeather from './widgets/WorldWeather/WorldWeather';

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
          <WorldWeather cities={[3060972, 683506, 703448, 3196359, 4095475, 3186886]}/>
        </div>
      </div>
    </div>
  );
}

export default App;
