import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import styles from './LocalWeather.module.scss';
import Card from '../../components/Card/Card';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import tempConverter from '../../utils/helpers/tempConverter';

const LocalWeather = ({ latitude, longitude }) => {
  const [localWeather, setLocalWeather] = useState();
  const [localWeatherStatus, setLocalWeatherStatus] = useState();
  const dailyForecast = localWeather && localWeather.daily.slice(1, -1);
  const hourlyForecast = localWeather && localWeather.hourly.slice(1, 13);
  const [isChecked, setIsChecked] = useState(false);
  const unit = isChecked ? 'imperial' : 'metric';

  useEffect(() => {
    latitude &&
      longitude &&
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`
        )
        .then(({ data }) => {
          setLocalWeather(data);
          setLocalWeatherStatus('Success!');
        })
        .catch((error) => {
          setLocalWeatherStatus(error);
        });
  }, [latitude, longitude]);

  const onUnitChange = (checked) => {
    setIsChecked(checked);
  };

  return localWeather ? (
    <Card>
      <Card.Header>
        <div>
          <h2 className={styles.city}>{localWeather.timezone}</h2>
          <p className={styles.currentTemperature}>
            {tempConverter(localWeather.current.temp, unit)}&#176;
          </p>
        </div>
        <ToggleSwitch
          id="unit"
          checked={isChecked}
          onChange={onUnitChange}
          optionLabels={['°F', '°C']}
        />
      </Card.Header>
      <Card.Body>
        {dailyForecast.map((item, index) => {
          return (
            <div className={styles.daily} key={index}>
              <p>{moment(item.dt * 1000).format('dddd')}</p>
              <img
                className={styles.icon}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].main}
              />
              <p>
                {tempConverter(item.temp.max, unit)}&#176;/
                {tempConverter(item.temp.min, unit)}&#176;
              </p>
            </div>
          );
        })}
      </Card.Body>
      <Card.Footer>
        {hourlyForecast.map((item, index) => {
          return (
            <div className={styles.hourly} key={index}>
              <p>{moment(item.dt * 1000).format('k')}</p>
              <img
                className={styles.icon}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].main}
              />
              <p>{tempConverter(item.temp, unit)}&#176;</p>
            </div>
          );
        })}
      </Card.Footer>
    </Card>
  ) : (
    <p>Loading...</p>
  );
};

LocalWeather.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default LocalWeather;
