import React, { useState, useEffect } from 'react';

const Notification = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    let fadeOutTimer;

    const fadeInTimer = setTimeout(() => {
      setIsVisible(false);

      fadeOutTimer = setTimeout(() => {
        props.onClose();
      }, props.hideTimeout);

    }, props.showTimeout);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
    }
  }, [props.onClose, props.showTimeout, props.hideTimeout]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 
        rounded-lg shadow-lg transition-opacity duration-${props.hideTimeout} ease-in-out 
      ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {props.message}
    </div>);
};

export default Notification;
