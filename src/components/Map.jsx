import React, { useEffect,useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// TODO：現状locationInfoを使えてないので、見せたい位置をdefaultCenterに置き換える
const Map = ({ locationInfo }) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDNkYM2cegWpgjbYH84mYXmzLHSTDfEHEg"
  });

  const [center, setCenter] = useState({ lat: 35.6809591, lng: 139.7673068 });

  useEffect(() => {
    if (locationInfo && locationInfo.lat && locationInfo.lng) {
      setCenter({ lat: locationInfo.lat, lng: locationInfo.lng });
      console.log("locationInfoの更新後の内容",locationInfo);
    }
  }, [locationInfo]);

  const handleMapLoad = map => {
    const panorama = new window.google.maps.StreetViewPanorama(
      document.getElementById('pano'), // パノラマを表示する要素のID
      {
        position: center,
        pov: { heading: 165, pitch: 0 },
        zoom: 30,
      }
    );
    console.log("panorama",panorama);
    map.setStreetView(panorama);
  };

  return isLoaded ? (
    <>
    <div className='mapApi'>
   
        <div id='pano'>
        <GoogleMap
          onLoad={handleMapLoad}
          center={center}
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