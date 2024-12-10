'use client'

import React, { useState, useEffect } from "react";

const Typewriter: React.FC = () => {
  const words = ["¡Bienvenido a PropuestasPeru!", "Comparte y crea tus propias propuestas", "Comenta y reacciona."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 70; // Velocidad de escritura
  const pauseTime = 0;  // Pausa entre palabras

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      if (isDeleting) {
        setText((prev) => prev.slice(0, -1));
        if (text === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setText(currentWord.slice(0, text.length + 1));
        if (text === currentWord) {
          setIsDeleting(true);
          timeout = setTimeout(handleTyping, pauseTime);
          return;
        }
      }
      timeout = setTimeout(handleTyping, typingSpeed);
    };

    timeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeout); // Limpia el timeout al desmontar
  }, [text, isDeleting, currentWordIndex, words]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 id="typewriter" className="text-3xl font-bold text-gray-700 mb-6">
        {text}
      </h1>
    </div>
  );
};

export default Typewriter;