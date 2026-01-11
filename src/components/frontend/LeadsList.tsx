import { MapPin, Phone, Mail } from 'lucide-react';
import type { Lead } from '../../lib/types';

interface LeadsListProps {
  leads: Lead[];
  selectedLead?: Lead;
  onLeadSelect?: (lead: Lead) => void;
}

export function LeadsList({ leads, selectedLead, onLeadSelect }: LeadsListProps) {
  return (
    <div className="space-y-3">
      {leads.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Még nincsenek elérhető kapcsolatok</h3>
          <p className="text-gray-600">Várj amíg az admin hozzáad kapcsolatokat</p>
        </div>
      ) : (
        leads.map((lead) => (
          <div
            key={lead.id}
            onClick={() => onLeadSelect?.(lead)}
            className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer transition hover:shadow-md ${
              selectedLead?.id === lead.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{lead.name}</h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{lead.phone}</span>
                  </div>

                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 mt-1" />
                    <div>
                      <p>{lead.address}</p>
                      <p>{lead.postal_code} {lead.city}</p>
                    </div>
                  </div>

                  {lead.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600">{lead.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {lead.latitude && lead.longitude && (
                <div className="ml-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
