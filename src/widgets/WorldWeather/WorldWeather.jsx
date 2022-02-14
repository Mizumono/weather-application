import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './WorldWeather.module.scss';
import Carousel from '../../components/Carousel/Carousel';
import PropTypes from 'prop-types';
import Card from '../../components/Card/Card';

const WorldWeather = ({ cities }) => {
  const requestArray = cities.map(
    (city) =>
      `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`
  );
  const [worldWeather, setWorldWeather] = useState();
  const [worldWeatherStatus, setWorldWeatherStatus] = useState();

  useEffect(() => {
    cities &&
      axios
        .all(requestArray.map((request) => axios.get(request)))
        .then((response) => {
          setWorldWeather(response);
          setWorldWeatherStatus('Success!');
        })
        .catch((error) => {
          setWorldWeatherStatus(error);
        });
  }, [cities]);

  return worldWeather ? (
    <Card>
      <Carousel>
        {worldWeather.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <Card.Body>
                <div className={styles.content}>
                  <h2 className={styles.city}>{item.data.name}</h2>
                  <p className={styles.currentTemperature}>
                    <span>{Math.round(item.data.main.temp_max)}&#176;</span> /{' '}
                    <span className={styles.tempMin}>
                      {Math.round(item.data.main.temp_min)}&#176;
                    </span>
                  </p>
                </div>
              </Card.Body>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Card>
  ) : (
    <p>Loading...</p>
  );
};

WorldWeather.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.number),
};

export default WorldWeather;
