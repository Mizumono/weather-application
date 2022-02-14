import React, { useEffect, useState } from 'react';
import style from './Carousel.module.scss';

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex(activeIndex + 1);
    }, 2000);

    return () => interval && clearInterval(interval);
  });

  const updateIndex = (newIndex) => {
    newIndex >= React.Children.count(children)
      ? setActiveIndex(0)
      : setActiveIndex(newIndex);
  };

  return (
    <div className={style.carousel}>
      <div
        className={style.inner}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child);
        })}
      </div>
    </div>
  );
};

Carousel.Item = ({ children }) => (
  <div className={style.carouselItem}>{children}</div>
);

export default Carousel;
