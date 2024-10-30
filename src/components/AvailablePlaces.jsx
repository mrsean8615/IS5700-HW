import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError ] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true)

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setLoading(false)

        });


      } catch (error) {
        setError({message: error.message || 'Could not fetch place please try again later'})
      }
      setLoading(false)


    }

    fetchPlaces();
  }, []);


  if (error) {
    return <Error title="An error occurred!" message={error.message}/>
  }

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
