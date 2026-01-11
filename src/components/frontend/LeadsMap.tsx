import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Lead } from '../../lib/types';

interface LeadsMapProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
}

const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function LeadsMap({ leads, onLeadClick }: LeadsMapProps) {
  const leadsWithCoords = leads.filter(lead => lead.latitude && lead.longitude);

  const defaultCenter: [number, number] = leadsWithCoords.length > 0
    ? [leadsWithCoords[0].latitude!, leadsWithCoords[0].longitude!]
    : [47.4979, 19.0402];

  return (
    <div className="h-[500px] rounded-xl overflow-hidden shadow-sm border border-gray-200">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {leadsWithCoords.map((lead) => (
          <Marker
            key={lead.id}
            position={[lead.latitude!, lead.longitude!]}
            icon={markerIcon}
            eventHandlers={{
              click: () => onLeadClick?.(lead)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">{lead.name}</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Telefonszám:</strong> {lead.phone}</p>
                  <p><strong>Cím:</strong> {lead.address}</p>
                  <p><strong>Város:</strong> {lead.city}</p>
                  <p><strong>Irányítószám:</strong> {lead.postal_code}</p>
                  {lead.notes && (
                    <p className="mt-2 text-gray-600">{lead.notes}</p>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
