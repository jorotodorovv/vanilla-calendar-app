import React, { useState, useEffect, useMemo } from 'react';

const Notification = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Memoizes the message prop to optimize performance
   ```
   /**
    * Manages the visibility and timing of a component with fade-in and fade-out effects.
    * @param {Function} props.onClose - Function to be called after the component fades out.
    * @param {number} props.showTimeout - Duration in milliseconds for which the component remains visible.
    ```
    /**
     * Sets up a timer to fade out and close a component after specified timeouts
     * @param {number} props.showTimeout - The duration in milliseconds before the component starts to fade out
     * @param {number} props.hideTimeout - The duration in milliseconds for the fade out animation
     * @param {function} props.onClose - The callback function to be executed after the component is fully faded out
     * @returns {void} This function doesn't return a value
     */
    ```
    * @param {number} props.hideTimeout - Duration in milliseconds for the fade-out effect.
    * @returns {Function} Cleanup function to clear any remaining timeouts.
    */
   ```
   * @param {Object} props - The component props
   * @param {string} props.message - The message to be memoized
   * @returns {string} The memoized message
   */
  let message = useMemo(() => props.message);

  useEffect(() => {
    setIsVisible(true);
/**
 * Sets a timer to automatically close the component after a specified timeout
 * @param {Function} props.onClose - The function to be called when the component should close
 * @param {number} props.hideTimeout - The duration in milliseconds before the component is closed
 * @returns {number} The timer ID returned by setTimeout, which can be used to cancel the timer if needed
 */

    let fadeOutTimer;

    const fadeInTimer = setTimeout(() => {
      setIsVisible(false);

      fadeOutTimer = setTimeout(() => {
        props.onClose();
      }, props.hideTimeout);

    }, props.showTimeout);

    /**
     * Returns a cleanup function that clears the fade-in and fade-out timers.
     * @returns {Function} A function that clears both fadeInTimer and fadeOutTimer when called.
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
