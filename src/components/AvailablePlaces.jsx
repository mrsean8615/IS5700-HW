import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true)
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setLoading(false)
    }

    fetchPlaces();
  }, []);


  return (
    <Places
      title="Available Places"
      loadingText="Fetching place data..."
      isLoading={loading}
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
