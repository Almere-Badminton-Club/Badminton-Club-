import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const center = {
  lat: 52.387038444575836, // Replace with the latitude of your sports club
  lng: 5.2316807370398655, // Replace with the longitude of your sports club
};

const MyMapComponent = () => {
  return (
    <div className="w-full h-[40vh] lg:w-[30vw] sm:w-[40vw] mx-10">
      <MapContainer center={center} zoom={13} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
          <Popup>
            Slagbaai 14, <br /> 1317 AC Almere
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MyMapComponent;
