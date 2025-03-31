import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NasaImageOfTheDay = () => {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
          params: {
            api_key: process.env.REACT_APP_NASA_API_KEY
          }
        });
        setImageData(response.data);
      } catch (err) {
        setError('Error fetching data from NASA API');
      }
    };

    fetchImage();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!imageData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="image-container">
      <h1>{imageData.title}</h1>
      <p>{imageData.explanation}</p>
      {imageData.media_type === 'image' ? (
        <img src={imageData.url} alt={imageData.title} />
      ) : (
        <iframe
          src={imageData.url}
          title="NASA Astronomy"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default NasaImageOfTheDay;
