import "./App.css";
import React, { useMemo, useState, useEffect } from "react";
import db from "./firebase_setup/firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import car from "./images/car.png";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function App() {
  const db = getDatabase();
  const [currentLocation, setCurrentLocation] = useState([]);
  const center = useMemo(() => ({ lat: 45.44437, lng: -73.82018 }), []);
  const fetchdata = async () => {
    const starCountRef = ref(db, "location/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentLocation(data);
      console.log(data);
    });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <MarkerF position={currentLocation} icon={car} />
    </GoogleMap>
  );
}

// function Map() {
//   const center = useMemo(() => ({ lat: 45.44437, lng: -73.82018 }), []);
//   return (
//     <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
//       <MarkerF position={currentLocation} icon={car} />
//     </GoogleMap>
//   );
// }
