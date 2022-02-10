import { useEffect, useState } from 'react';
import styles from './App.module.scss';

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
    <div className={styles.app}>
      <p>Weather Application</p>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>geolocationStatus: {geolocationStatus}</p>
    </div>
  );
}

export default App;
