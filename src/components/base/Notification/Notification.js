import React, { useState, useEffect, useMemo } from 'react';

const Notification = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  ```
  /**
   ```
   /**
    * Manages the visibility and timing of a component with fade-in and fade-out effects.
    * @param {Function} props.onClose - Function to be called when the component is fully hidden.
    * @param {number} props.showTimeout - Duration (in milliseconds) for which the component remains visible.
    * @param {number} props.hideTimeout - Duration (in milliseconds) for the fade-out effect.
    * @returns {Function} Cleanup function to clear any remaining timeouts.
    */
   ```
   * Creates a memoized version of the message prop
   * @param {Object} props - The component props
   * @param {string} props.message - The message to be memoized
   * @returns {string} The memoized message
   */
  /**
   * Sets up a two-stage timer for fading out and closing a component
   * @param {number} props.showTimeout - The duration (in milliseconds) to wait before starting the fade out
   * @param {number} props.hideTimeout - The duration (in milliseconds) for the fade out effect
   * @param {function} props.onClose - The callback function to be executed after the fade out is complete
   * @returns {number} The ID of the first timer, which can be used to clear the timeout if needed
   */
  ```
  let message = useMemo(() => props.message);

  useEffect(() => {
    setIsVisible(true);

    let fadeOutTimer;

    const fadeInTimer = setTimeout(() => {
      setIsVisible(false);

      /**
       * Sets a timer to fade out and close the component after a specified delay
       * @param {function} props.onClose - Function to be called when the component should close
       * @param {number} props.hideTimeout - Delay in milliseconds before closing the component
       * @returns {number} Timer ID for the setTimeout function
       */
      fadeOutTimer = setTimeout(() => {
        props.onClose();
      }, props.hideTimeout);

    }, props.showTimeout);

    /**
     * Returns a cleanup function that clears timeout timers.
     * @returns {Function} A function that clears both fadeIn and fadeOut timers when called.
     */
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
