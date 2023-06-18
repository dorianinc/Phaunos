import dotenv from "dotenv";
import { useEffect, useMemo } from "react";
import { useMap } from "../../context/MapContext";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Map.css";
dotenv.config();

const Map = ({ bookmarks }) => {
  const { currentZoom, setCurrentZoom, currentLat, setCurrentLat, currentLng, setCurrentLng } =
    useMap();
  const center = useMemo(() => ({ lat: currentLat, lng: currentLng }), [currentLat, currentLng]);
  const mapOptions = {
    zoom: currentZoom,
    center,
    mapTypeId: "terrain",
  };

  useEffect(() => {
    setCurrentZoom(8);
    setCurrentLat(40.112206);
    setCurrentLng(-120.90653);
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <>
      <GoogleMap options={mapOptions} mapContainerClassName="map-container">
        {bookmarks.map((bookmark) => (
          <Marker position={{ lat: bookmark.trail.lat, lng: bookmark.trail.lng }} />
        ))}
      </GoogleMap>
    </>
  );
};

export default Map;
