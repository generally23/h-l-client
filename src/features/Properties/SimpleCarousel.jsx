import React, { useRef, useState, useEffect } from 'react';

function Carousel({ children }) {
  const [mousedown, setMousedown] = useState(false);
  const [start, setStart] = useState(0);
  const [startX, setStartX] = useState(0);
  const [end, setEnd] = useState(0);
  const [position, setPosition] = useState(0);
  const [distance, setDistance] = useState(0);

  const sliderRef = useRef();

  const slideElement = (element, distance, transition = 0) => {
    element.style.transition = '';
    element.style.transform = `translate3d(${distance}px, 0, 0)`;
    if (transition) element.style.transition = '.5s';
  };

  const onMousedown = e => {
    setMousedown(true);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setStart(clientX);
    setStartX(start - position);
  };

  const onMousemove = e => {
    const slider = sliderRef.current;

    if (!mousedown) return;
    if (slider.scrollWidth <= slider.clientWidth) return;

    const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;

    setEnd(currentX);

    let distance = end - start;

    setPosition(currentX - startX);

    setDistance(distance);

    // Assuming you have access to slideElement function
    slideElement(slider, position);
  };

  const onMouseUp = () => {
    const slider = sliderRef.current;

    setMousedown(false);

    if (position > 0) {
      setPosition(0);
    } else if (position < -(slider.scrollWidth - slider.clientWidth)) {
      setPosition(-(slider.scrollWidth - slider.clientWidth));
    }

    // Assuming you have access to slideElement function
    slideElement(slider, position, 1);

    // reset values
    setDistance(0);
    setStart(0);
    setEnd(0);
  };

  useEffect(() => {
    const slider = sliderRef.current;

    slider.addEventListener('mousedown', onMousedown);
    slider.addEventListener('touchstart', onMousedown);
    window.addEventListener('mousemove', onMousemove);
    window.addEventListener('touchmove', onMousemove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onMouseUp);

    // Event listeners for moving the carousel
    slider.addEventListener('mouseleave', onMouseUp);
    slider.addEventListener('touchcancel', onMouseUp);

    return () => {
      slider.removeEventListener('mousedown', onMousedown);
      slider.removeEventListener('touchstart', onMousedown);
      window.removeEventListener('mousemove', onMousemove);
      window.removeEventListener('touchmove', onMousemove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
      slider.removeEventListener('mouseleave', onMouseUp);
      slider.removeEventListener('touchcancel', onMouseUp);
    };
  }, [mousedown]);

  return (
    <div
      className='carousel select-none overflow-hidden cursor-grab touch-none p-5'
      onMouseDown={onMousedown}
      onTouchStart={onMousedown}
      ref={sliderRef}
    >
      <div className='carousel__slider flex flex-nowrap' ref={sliderRef}>
        <div className='carousel__slider__margin'></div>
        {children}
        <div className='carousel__slider__margin'></div>
      </div>
    </div>
  );
}

export default Carousel;
