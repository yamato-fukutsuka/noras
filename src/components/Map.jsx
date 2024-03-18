import React, { useRef, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setMapTypeId('satellite');
      map.setTilt(45);
      map.setOptions({
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      });
    }
  }, []);

  const kokuraStation = {
    lat: 33.8854192,
    lng: 130.8820701
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDNkYM2cegWpgjbYH84mYXmzLHSTDfEHEg">
      <GoogleMap
        ref={mapRef}
        center={kokuraStation}
        zoom={20}
        mapContainerStyle={{ height: '400px', width: '100%' }}
        options={{
          mapTypeId: 'satellite',
          tilt: 45,
          heading: 180
        }}
      />
    </LoadScript>
  );
};

export default Map;