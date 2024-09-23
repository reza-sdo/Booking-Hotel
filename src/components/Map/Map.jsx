import React, { useEffect, useState } from 'react';
import { useHotels } from '../context/HotelsProvider';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useGeoLocation from '../../hooks/useGeoLocation';

const Map = ({markerLocation}) => {
  // const { isLoading, hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([50, 5]);
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const {
    isLoading: isLoadingGeoPos,
    position: geoPos,
    getPosition,
    error: geoError,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geoPos?.lat & geoPos?.lng) {
      setMapCenter([geoPos.lat, geoPos.lng]);
    }
  }, [geoPos]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button
          onClick={() => {
            getPosition();
          }}
          className="getLocation"
        >
          {isLoadingGeoPos ? 'loading...' : 'use your location'}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        <DetectClick />
        {markerLocation.map((item) => (
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

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`/bookmark?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
