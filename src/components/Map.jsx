// Map.js

import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const Map = ({ locationInfo }) => {
  const mapRef = useRef(null);
  const [isInfoWindowOpen, setInfoWindowOpen] = useState(false);

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

      if (locationInfo) {
        map.setZoom(22); // ズームレベルを22に設定
        map.panTo(locationInfo); // 地図の中心を指定した位置に移動
      }
    }
  }, [locationInfo]);

  const kokuraStation = {
    lat: 33.8854192,
    lng: 130.8820701
  };

  const handleMarkerClick = () => {
    setInfoWindowOpen(true);
  };

  const handleInfoWindowClose = () => {
    setInfoWindowOpen(false);
  };

  return (
    <div className='mapApi'>
    <LoadScript googleMapsApiKey="AIzaSyDNkYM2cegWpgjbYH84mYXmzLHSTDfEHEg">
      <GoogleMap
        ref={mapRef}
        center={locationInfo || kokuraStation}
        zoom={locationInfo ? 30 : 20} // ズームレベルを22に設定
        mapContainerStyle={{ height: '100vh', width: '100%' }}
        options={{
          mapTypeId: 'satellite',
          tilt: 45,
          heading: 180
        }}
      >
        {locationInfo && (
          <Marker position={locationInfo} onClick={handleMarkerClick} />
        )}
        {locationInfo && isInfoWindowOpen && (
          <InfoWindow position={locationInfo} onCloseClick={handleInfoWindowClose}>
            <div>{locationInfo.description}</div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
    </div>
  );
};

export default Map;