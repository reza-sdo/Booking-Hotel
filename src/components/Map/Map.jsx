import React, { useEffect, useState } from 'react';
import { useHotels } from '../context/HotelsProvider';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';

const Map = () => {
  const { isLoading, hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([50, 5]);
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {hotels.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
      ,
    </div>
  );
};

export default Map;

// this is for change center of map
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}