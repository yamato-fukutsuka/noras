// Map.js
import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// TODO：現状locationInfoを使えてないので、見せたい位置をdefaultCenterに置き換える
const Map = ({ locationInfo }) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDNkYM2cegWpgjbYH84mYXmzLHSTDfEHEg"
  });

  const defaultCenter = {
    lat: 35.6809591,
    lng: 139.7673068
  };

  const handleMapLoad = map => {
    const panorama = new window.google.maps.StreetViewPanorama(
      document.getElementById('pano'), // パノラマを表示する要素のID
      {
        position: defaultCenter,
        pov: { heading: 165, pitch: 0 },
        zoom: 30,
      }
    );
    map.setStreetView(panorama);
  };

  return isLoaded ? (
    <>
    <div className='mapApi'>
        <div id='pano'>
        <GoogleMap
          onLoad={handleMapLoad}
          center={defaultCenter}
          zoom={18} // ズームレベルを調整
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