import { createContext, useContext, useState } from "react";

export const TrailContext = createContext();
export const useTrail = () => useContext(TrailContext);

export default function TrailProvider({ children }) {
  const [currentTrail, setCurrentTrail] = useState("");


  return (
    <TrailContext.Provider
      value={{
        currentTrail,
        setCurrentTrail,
      }}
    >
      {children}
    </TrailContext.Provider>
  );
}
