import dotenv from "dotenv";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Map.css";
dotenv.config();

const Map = ({ bookmarks }) => {
  const center = useMemo(() => ({ lat: 37.738762, lng: -119.572220 }), []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <>
      <GoogleMap zoom={14} center={center} mapContainerClassName="map-container">
        {bookmarks.map((bookmark, i) => (
        <Marker position={{ lat: bookmark.trail.lat, lng: bookmark.trail.long }} />
            ))}
      </GoogleMap>
    </>
  );
};
