import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import styles from './LocalWeather.module.scss';
import Card from '../../components/Card/Card';
import PropTypes from 'prop-types';

const LocalWeather = ({ latitude, longitude }) => {
  const [localWeather, setLocalWeather] = useState();
  const [localWeatherStatus, setLocalWeatherStatus] = useState();
  const dailyForecast = localWeather && localWeather.daily.slice(1, -1);
  const hourlyForecast = localWeather && localWeather.hourly.slice(1, 13);

  useEffect(() => {
    latitude && longitude && axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid={API key}&units=metric`)
    .then(({data}) => {
      setLocalWeather(data);
      setLocalWeather('Success!')
    })
    .catch(error => {
      setLocalWeatherStatus(error);
    });
  }, [latitude, longitude])

  return (
    localWeather ? (
      <Card>
        <Card.Header>
          <h3 className={styles.city}>{localWeather.timezone}</h3>
          <p className={styles.currentTemperature}>{Math.round(localWeather.current.temp)}&#176;</p>
        </Card.Header>
        <Card.Body>
          {dailyForecast.map((item, index) => {
            return (
              <div className={styles.daily} key={index}>
                <p>{moment(item.dt * 1000).format('dddd')}</p>
                <img className={styles.icon} src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
                <p>{Math.round(item.temp.max)}&#176;/{Math.round(item.temp.min)}&#176;</p>
              </div>
            )
          })}
        </Card.Body>
        <Card.Footer>
          {hourlyForecast.map((item, index) => {
            return (
              <div className={styles.hourly} key={index}>
                <p>{moment(item.dt * 1000).format('k')}</p>
                <img className={styles.icon} src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
                <p>{Math.round(item.temp)}&#176;</p>
              </div>
            )
          })}
        </Card.Footer>
      </Card>
    ) : <p>Loading...</p>
  )
}

LocalWeather.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default LocalWeather;
