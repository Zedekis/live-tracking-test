import "./App.css";
import React, { useMemo, useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import database from "./firebase_setup/firebase";
import car from "./images/car.png";
import { getDistance } from "geolib";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

export default function App() {
  let id;
  const [count, setCount] = useState(0);
  const [textState, setText] = useState({
    recipient: "5146044249",
    textmessage: "you are 500 meters away from your location",
  });
  const target = { lat: 45.43233, lng: -73.84676 };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCkXc9zl5kV9CxJOY0W0iDxDMPfzdMqBns",
  });
  const [currentLocation, setCurrentLocation] = useState([]);
  const center = useMemo(() => ({ lat: 45.44437, lng: -73.82018 }), []);

  async function success(pos) {
    const crd = pos.coords;

    await setDoc(doc(database, "/users", "Edris"), {
      Name: "Edris",
      Location: { lat: crd.latitude, lng: crd.longitude },
    });
  }

  const fetchdata = async () => {
    const q = query(
      collection(database, "/users"),
      where("Name", "==", "Edris")
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setCurrentLocation(doc.data().Location);
    });
    console.log(currentLocation);
    checkDistance();
  };

  function checkDistance() {
    if (getDistance(currentLocation, target, 1) <= 500 && count != 1) {
      setCount(1);

      setText({
        recipient: textState.recipient,
        textmessage: "you are 500 meters away from your location",
      });
      sendText();
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(success);
      fetchdata();
    }, 1000);
    return () => clearInterval(interval);
  }, [id]);

  const sendText = () => {
    fetch(
      `http://127.0.0.1:4000/send-text?recipient=${textState.recipient}&textmessage=${textState.textmessage}`
    ).catch((err) => console.error(err));
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <MarkerF position={currentLocation} icon={car} />
      <MarkerF position={target} />
    </GoogleMap>
  );
}
