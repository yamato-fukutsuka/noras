// Map.js
import React, { useRef, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = ({ locationInfo }) => {
  const mapRef = useRef(null);

  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setOptions({
        mapTypeId: 'satellite',
        tilt: 45,
        heading: 180
      });

      if (locationInfo) {
        map.setCenter(locationInfo);
        map.setZoom(40); // ズームレベルを18に設定
      } else {
        map.setZoom(40); // 初期のズームレベルを18に設定
      }
    }
  }, [locationInfo]);

  const defaultCenter = {
    lat: 35.6809591,
    lng: 139.7673068
  };

  return (
    <div className='mapApi'>
    <LoadScript googleMapsApiKey="AIzaSyDNkYM2cegWpgjbYH84mYXmzLHSTDfEHEg">
      <GoogleMap
        onLoad={handleMapLoad}
        center={locationInfo || defaultCenter}
        zoom={40} // ズームレベルを18に設定
        mapContainerStyle={{ height: '400px', width: '100%' }}
        options={{
          mapTypeId: 'satellite',
          tilt: 45,
          heading: 180
        }}
      />
    </LoadScript>
    </div>
  );
};

export default Map;