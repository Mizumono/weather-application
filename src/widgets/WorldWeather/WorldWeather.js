import Card from '../../components/Card/Card';
import PropTypes from 'prop-types';

const WorldWeather = ({ latitude, longitude }) => {
  return (
    <Card>
      <Card.Header>Header</Card.Header>
      <Card.Body>Body</Card.Body>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  )
}

WorldWeather.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default WorldWeather;
