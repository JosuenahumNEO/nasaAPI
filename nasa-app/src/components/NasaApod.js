import React, { useState, useEffect } from 'react';
import './NasaApod.css'; // Archivo de estilos opcional

const NasaApod = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reemplaza con tu API key de la NASA
  const API_KEY = 'DEMO_KEY'; // Usa tu propia key
  const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(APOD_URL);
        if (!response.ok) throw new Error('Error en la solicitud');
        
        const data = await response.json();
        setApodData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="apod-container">
      <h1>Imagen Astronómica del Día</h1>
      <h2>{apodData.title}</h2>
      <div className="content-wrapper">
        {apodData.media_type === 'image' ? (
          <img 
            src={apodData.url} 
            alt={apodData.title} 
            className="apod-image"
          />
        ) : (
          <iframe
            title="apod-video"
            src={apodData.url}
            frameBorder="0"
            allowFullScreen
            className="apod-video"
          />
        )}
        <div className="explanation">
          <p>{apodData.explanation}</p>
          <p className="date">Fecha: {apodData.date}</p>
          {apodData.copyright && (
            <p className="copyright">© {apodData.copyright}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NasaApod;