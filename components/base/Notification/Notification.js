import React, { useState, useEffect, useMemo } from 'react';

const Notification = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  let message = useMemo(() => props.message);

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
      onClick={props.onClose}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 
        rounded-lg shadow-lg transition-opacity duration-${props.hideTimeout} ease-in-out 
      ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {message}
    </div>);
};

export default Notification;
