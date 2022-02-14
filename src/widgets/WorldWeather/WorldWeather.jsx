import Carousel from '../../components/Carousel/Carousel';
import PropTypes from 'prop-types';
import Card from '../../components/Card/Card';

const WorldWeather = ({ latitude, longitude }) => {
  return (
    <Carousel>
      <Carousel.Item><Card>1</Card></Carousel.Item>
      <Carousel.Item><Card>2</Card></Carousel.Item>
      <Carousel.Item><Card>3</Card></Carousel.Item>
    </Carousel>
  )
}

WorldWeather.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default WorldWeather;
