import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

interface MapPickerProps {
  value?: string;
  onChange: (coords: string) => void;
  onAddressChange?: (address: string) => void;
}

const containerStyle = {
  width: "100%",
  height: "350px",
  borderRadius: "8px",
};

const defaultCenter = { lat: -17.7833, lng: -63.1821 }; // Santa Cruz - Bolivia

const MapPicker: React.FC<MapPickerProps> = ({ value, onChange, onAddressChange }) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    value
      ? (() => {
          const [lat, lng] = value.split(",").map(Number);
          return { lat, lng };
        })()
      : defaultCenter
  );
  const [address, setAddress] = useState<string>("");

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBU0TXwS8LSDGDZNxpRT7EPyyxNXZGUSSI", // ⚠️ reemplazá con tu API Key
    libraries: ["places"],
  });

  // 🔁 Convertir coordenadas → dirección
  const getAddressFromCoords = useCallback(
    (lat: number, lng: number) => {
      if (!geocoderRef.current) return;
      geocoderRef.current.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const formatted = results[0].formatted_address;
          setAddress(formatted);
          onAddressChange?.(formatted);
        } else {
          setAddress("No se pudo obtener la dirección");
        }
      });
    },
    [onAddressChange]
  );

  // 📍 Click en mapa
  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const coords = `${lat}, ${lng}`;
        setPosition({ lat, lng });
        onChange(coords);
        getAddressFromCoords(lat, lng);
      }
    },
    [onChange, getAddressFromCoords]
  );

  // 📍 Arrastrar marcador
  const handleMarkerDragEnd = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const coords = `${lat}, ${lng}`;
        setPosition({ lat, lng });
        onChange(coords);
        getAddressFromCoords(lat, lng);
      }
    },
    [onChange, getAddressFromCoords]
  );

  // 🔎 Buscar dirección (Autocomplete)
  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setPosition({ lat, lng });
        onChange(`${lat}, ${lng}`);
        getAddressFromCoords(lat, lng);
        map?.panTo({ lat, lng });
      }
    }
  };

  return (
    <div className="space-y-2">
      {isLoaded ? (
        <>
          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Buscar dirección..."
              className="w-full p-2 border rounded"
            />
          </Autocomplete>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position || defaultCenter}
            zoom={14}
            onClick={handleMapClick}
            onLoad={(m) => {
              setMap(m);
              geocoderRef.current = new google.maps.Geocoder();
            }}
          >
            {position && (
              <Marker
                position={position}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
              />
            )}
          </GoogleMap>

          {address && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              📍 <strong>Dirección:</strong> {address}
            </p>
          )}
        </>
      ) : (
        <p>Cargando mapa...</p>
      )}
    </div>
  );
};

export default React.memo(MapPicker);
