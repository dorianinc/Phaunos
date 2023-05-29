import { createContext, useContext, useState } from "react";

export const MapContext = createContext();
export const useMap = () => useContext(MapContext);

export default function MapProvider({ children }) {
  const [currentZoom, setCurrentZoom] = useState(15);
  const [currentLat, setCurrentLat] = useState(39.809879);
  const [currentLng, setCurrentLng] = useState(-98.556732);


  return (
    <MapContext.Provider
      value={{
        currentZoom,
        setCurrentZoom,
        currentLat,
        setCurrentLat,
        currentLng,
        setCurrentLng
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
