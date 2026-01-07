import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

interface Location {
  lat: number;
  lng: number;
}

const GEOAPIFY_API_KEY = "6184ba5810384b54991387dbd4eab6c0";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MapLocation = ({ form, fieldName, label }: any) => {
  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState<Location | null>(null);
  console.log(position);
  console.log("PUA", address);

  useEffect(() => {
    if (showMap && !position) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition({ lat, lng });
          await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${GEOAPIFY_API_KEY}`
          )
            .then((res) => res.json())
            .then((data) => {
              const country = data.results[0].country;
              console.log(country);
              if (country !== "Bangladesh") {
                return alert("Please select location inside Bangladesh!");
              }
              const selectedAddress = data.results[0].formatted;
              setAddress(selectedAddress);
              form.setValue(fieldName, selectedAddress);
            });
        },
        (err) => {
          console.error("Geolocation error:", err);
          alert("Unable to fetch your location. Please allow location access.");
        }
      );
    }
  }, [fieldName, form, position, showMap]);

  console.log("Position", position);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${GEOAPIFY_API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            const country = data.results[0].country;
            console.log(country);
            if (country !== "Bangladesh") {
              return alert("Please select location inside Bangladesh!");
            }
            const selectedAddress = data.results[0].formatted as string;
            setAddress(selectedAddress || "Unknown Location");
            form.setValue(fieldName, selectedAddress);
          });
      },
    });
    return position ? <Marker position={position} /> : null;
  }

  return (
    <div>
      <FormField
        control={form.control}
        name={`${fieldName}`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                readOnly
                placeholder={`Enter ${label}`}
                onClick={() => setShowMap(true)}
                value={address}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {showMap && position && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center z-50 space-y-2">
          <div className="bg-white p-3 rounded-lg shadow-lg w-[90%] h-[80%] relative space-y-3">
            <MapContainer
              center={
                position ? [position.lat, position.lng] : [22.3569, 91.7832]
              }
              zoom={12}
              className="h-full w-full rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <LocationMarker />
            </MapContainer>
          </div>
          <button
            onClick={() => setShowMap(false)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MapLocation;
