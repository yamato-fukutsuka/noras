```
import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';
import axios from 'axios';

const Map = ({ locationInfo, onDetectedObjects }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC_fVLz8h1khvnkMo-Y2kiPvOjEM8VUs8w"
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
  
        // ストリートビューの画像を取得する
        const streetViewImage = panorama.getPhotographerPov();
        console.log("streetViewImageの更新後の内容", streetViewImage);
        if(streetViewImage !== undefined){
          const imageUrl = `https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${center.lat},${center.lng}&heading=${streetViewImage.heading}&pitch=${streetViewImage.pitch}&key=AIzaSyC_fVLz8h1khvnkMo-Y2kiPvOjEM8VUs8w`;
          console.log("imageUrlの更新後の内容", imageUrl);
        // 取得した画像をAzure Computer Visionに送信し、物体検出を行う
        axios.post('https://mapanalysis.cognitiveservices.azure.com/vision/v3.2/detect', {
          url: imageUrl
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': '467591834ec24a21b2fc3878ba91072f'
          }
        })
        .then(response => {
          const detectedObjects = response.data.objects.map(obj => obj.object);
          console.log("detectedObjectsの更新後の内容", detectedObjects)
          onDetectedObjects(detectedObjects);
        })
        .catch(error => {
          console.error('Error:', error);
        });
        }
      }
  }, [center, panorama, hasStreetView]);


  let dragFlag = false;
  let lastTime = null;
  const handlePanoramaDrag = (event) => {
    // 最終イベント実行を記録する
    lastTime = Date.now();
  };

  setInterval(() => {
    if(lastTime!=null){
      if(Date.now() - lastTime > 500){
        // ここで処理を実行する（例：位置情報を保存する、API呼び出しを行うなど）
        // この関数はドラッグが完全に終了したタイミングで呼ばれます
        console.log("AAA")
        lastTime = null;
      }
    }
  }, 500);


  return isLoaded ? (
    <>
      <div className='mapApi' id="ap">
        <div id='pano'>
          <GoogleMap
            center={center}
            zoom={18}
            mapContainerStyle={{ height: '100vh', width: '100%' }}
            options={{
              mapTypeId: 'satellite',
              tilt: 45,
              heading: 180
            }}
          >
          <StreetViewPanorama
              position={center} // ストリートビューの位置を設定
              pov={{ heading: 165, pitch: 0 }}
              zoom={30}
              visible // ストリートビューを表示
              onPovChanged={handlePanoramaDrag} // ドラッグイベントのハンドラ

          />
          </GoogleMap>
        </div>
      </div>
    </>
  ) : null;
};

export default Map;
