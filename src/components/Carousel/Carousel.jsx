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
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          activeIndex: activeIndex === index,
        });
      })}
    </div>
  );
};

Carousel.Item = ({ children, activeIndex }) => (
  <div className={`${style.carouselItem} ${activeIndex && style.active}`}>
    {children}
  </div>
);

export default Carousel;
