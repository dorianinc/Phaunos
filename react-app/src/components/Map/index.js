import dotenv from "dotenv";
import { useEffect, useMemo } from "react";
import { useMap } from "../../context/MapContext";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Map.css";
dotenv.config();

const Map = ({ bookmarks }) => {
  const { currentZoom, setCurrentZoom, currentLat, setCurrentLat, currentLng, setCurrentLng } = useMap();
  const center = useMemo(() => ({ lat: currentLat, lng: currentLng }), [currentLat, currentLng]);
  const mapOptions = {
    zoom: currentZoom,
    center,
    mapTypeId: 'terrain',
  };
  
  useEffect(() => {
    setCurrentZoom(5);
    setCurrentLat(39.809879)
    setCurrentLng(-98.556732)
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <>
      <GoogleMap
        options={mapOptions}
        mapContainerClassName="map-container"
      >
        {bookmarks.map((bookmark, i) => (
          <Marker position={{ lat: bookmark.trail.lat, lng: bookmark.trail.long }} />
        ))}
      </GoogleMap>
    </>
  );
};

export default Map;
