import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import dotenv from "dotenv";

dotenv.config();

const Map = () => {
//   const {} = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
//   });

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default Map;
