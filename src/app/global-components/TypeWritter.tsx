import React, { useState, useEffect } from "react";

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset when the text changes
  useEffect(() => {
    setCurrentText("");
    setCurrentIndex(0);
  }, [text]);

  // Typing logic
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{currentText}</span>;
};

export default Typewriter;
