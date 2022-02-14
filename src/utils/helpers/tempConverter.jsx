const tempConverter = (temp, unit) => {
  return unit === 'metric' ? Math.round(temp) : Math.round((temp * 9) / 5 + 32);
};

export default tempConverter;
