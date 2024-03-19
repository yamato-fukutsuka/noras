import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const Map = ({ locationInfo }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDNkYM2cegWpgjbYH84mYXmzLHSTDfEHEg"
  });

  const [center, setCenter] = useState({ lat: 35.6809591, lng: 139.7673068 });
  const [panorama, setPanorama] = useState(null);
  const [hasStreetView, setHasStreetView] = useState(true);

  useEffect(() => {
    if (locationInfo && locationInfo.lat && locationInfo.lng) {
      const newPosition = new window.google.maps.LatLng(locationInfo.lat, locationInfo.lng);
  
      // ストリートビューの有無を確認
      const streetViewService = new window.google.maps.StreetViewService();
      streetViewService.getPanoramaByLocation(newPosition, 50, (data, status) => {
        if (status === window.google.maps.StreetViewStatus.OK) {
          setHasStreetView(true);
        } else {
          setHasStreetView(false);
        }
        setCenter({ lat: locationInfo.lat, lng: locationInfo.lng });
      });
  
      console.log("locationInfoの更新後の内容", locationInfo);
    }
  }, [locationInfo]);

  useEffect(() => {
    if (panorama && hasStreetView) {
      const newPosition = new window.google.maps.LatLng(center.lat, center.lng);
      panorama.setPosition(newPosition);
      console.log("panoramaの更新後の内容", panorama);
    }
  }, [center, panorama, hasStreetView]);

  const handleMapLoad = map => {
    const newPanorama = new window.google.maps.StreetViewPanorama(
      document.getElementById('pano'),
      {
        position: center,
        pov: { heading: 165, pitch: 0 },
        zoom: 30,
      }
    );
    console.log("panorama", newPanorama);
    map.setStreetView(newPanorama);
    setPanorama(newPanorama);
  };

  return isLoaded ? (
    <>
      <div className='mapApi'>
        <div id='pano'>
          <GoogleMap
            onLoad={handleMapLoad}
            center={center}
            zoom={18}
            mapContainerStyle={{ height: '100vh', width: '100%' }}
            options={{
              mapTypeId: 'satellite',
              tilt: 45,
              heading: 180
            }}
          />
        </div>
      </div>
    </>
  ) : null;
};

export default Map;