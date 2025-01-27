import { useState, useEffect } from 'react';
import '../styles/hero.css';

export const Hero = () => {
  const [joke, setJoke] = useState('');

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://api-carambar-cda.onrender.com/jokes/');
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const randomJoke = data[Math.floor(Math.random() * data.length)];
        if (randomJoke.text) {
          setJoke(randomJoke.text);
        } else {
          setJoke('impossible de generer la blague.');
        }
      } else {
        setJoke('blague inconnu.');
      }
    } catch (error) {
      console.error('impossible affiché la blague:', error);
      setJoke('erreur lors de la generation de blague.');
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="hero">
      <h1>Blagues Carambar</h1>
      <p>{joke}</p>
      <button onClick={fetchJoke}>Genere une autre blague</button>
    </div>
  );
};

