import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { LocationItem, AttractionItem } from '../types';

interface LeafletMapProps {
  origin: LocationItem | null;
  destination: LocationItem | null;
  attractions: AttractionItem[];
  onSelectAttraction?: (attr: AttractionItem) => void;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  origin,
  destination,
  attractions,
  onSelectAttraction,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default to India / World view
      const initialLat = destination ? destination.lat : 27.1751;
      const initialLng = destination ? destination.lng : 78.0421;

      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: true,
      }).setView([initialLat, initialLng], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // Keep map alive unless unmounted
    };
  }, []);

  // Update markers and route lines whenever origin, destination or attractions change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();
    const boundsPoints: L.LatLngExpression[] = [];

    // Helper to create clean custom HTML divIcons
    const createCustomIcon = (bgColor: string, label: string) => {
      return L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background-color: ${bgColor};
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
            border: 2px solid white;
            white-space: nowrap;
          ">
            <span>📍</span>
            <span>${label}</span>
          </div>
        `,
        iconSize: [100, 30],
        iconAnchor: [50, 15],
      });
    };

    // 1. Origin Marker
    if (origin && !isNaN(origin.lat) && !isNaN(origin.lng)) {
      const originIcon = createCustomIcon('#2563eb', 'Start: ' + origin.name.slice(0, 15));
      const originMarker = L.marker([origin.lat, origin.lng], { icon: originIcon });
      originMarker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px;">
          <b style="color: #1e3a8a;">Starting Point</b><br/>
          <span>${origin.displayName || origin.name}</span>
        </div>
      `);
      layerGroup.addLayer(originMarker);
      boundsPoints.push([origin.lat, origin.lng]);
    }

    // 2. Destination Marker
    if (destination && !isNaN(destination.lat) && !isNaN(destination.lng)) {
      const destIcon = createCustomIcon('#b45309', destination.name.slice(0, 18));
      const destMarker = L.marker([destination.lat, destination.lng], { icon: destIcon });
      destMarker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px;">
          <b style="color: #78350f; font-size: 14px;">${destination.name}</b><br/>
          <span style="font-size: 11px; color: #57534e;">${destination.displayName}</span><br/>
          <div style="margin-top: 6px;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}" target="_blank" rel="noopener noreferrer" style="color: #b45309; font-weight: bold; font-size: 12px; text-decoration: underline;">
              Get Directions &rarr;
            </a>
          </div>
        </div>
      `);
      layerGroup.addLayer(destMarker);
      boundsPoints.push([destination.lat, destination.lng]);
    }

    // 3. Route line between origin and destination
    if (
      origin &&
      destination &&
      !isNaN(origin.lat) &&
      !isNaN(origin.lng) &&
      !isNaN(destination.lat) &&
      !isNaN(destination.lng)
    ) {
      const polyline = L.polyline(
        [
          [origin.lat, origin.lng],
          [destination.lat, destination.lng],
        ],
        {
          color: '#d97706',
          weight: 4,
          opacity: 0.8,
          dashArray: '8, 8',
        }
      );
      layerGroup.addLayer(polyline);
    }

    // 4. Attractions Markers
    attractions.forEach((attr) => {
      if (isNaN(attr.lat) || isNaN(attr.lng)) return;

      const attrIcon = L.divIcon({
        className: 'attr-map-pin',
        html: `
          <div style="
            background-color: #059669;
            color: white;
            padding: 3px 6px;
            border-radius: 8px;
            font-size: 10px;
            font-weight: 600;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
            border: 1.5px solid white;
            white-space: nowrap;
          ">
            🏛️ ${attr.name.slice(0, 14)}
          </div>
        `,
        iconSize: [80, 24],
        iconAnchor: [40, 12],
      });

      const marker = L.marker([attr.lat, attr.lng], { icon: attrIcon });
      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px; max-width: 200px;">
          <b style="color: #065f46;">${attr.name}</b><br/>
          <span style="font-size: 10px; color: #57534e;">${attr.category}</span>
          <p style="font-size: 11px; margin: 4px 0;">${attr.shortDescription.slice(0, 80)}...</p>
          <div style="margin-top: 4px;">
            <a href="${attr.directionUrl}" target="_blank" rel="noopener noreferrer" style="color: #059669; font-size: 11px; font-weight: bold;">
              Directions
            </a>
          </div>
        </div>
      `);

      if (onSelectAttraction) {
        marker.on('click', () => onSelectAttraction(attr));
      }

      layerGroup.addLayer(marker);
      boundsPoints.push([attr.lat, attr.lng]);
    });

    // Fit bounds smoothly
    if (boundsPoints.length > 1) {
      map.fitBounds(boundsPoints, { padding: [40, 40], maxZoom: 15 });
    } else if (destination) {
      map.setView([destination.lat, destination.lng], 13);
    }
  }, [origin, destination, attractions, onSelectAttraction]);

  // Resize observer to prevent grey tile bugs
  useEffect(() => {
    if (!mapContainerRef.current || !mapInstanceRef.current) return;
    const observer = new ResizeObserver(() => {
      mapInstanceRef.current?.invalidateSize();
    });
    observer.observe(mapContainerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-[380px] sm:h-[460px] w-full rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
      <div ref={mapContainerRef} className="h-full w-full z-10" />

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-20 rounded-xl bg-white/95 px-3 py-2 text-[10px] font-medium text-stone-700 shadow-md backdrop-blur-xs border border-stone-200/80 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600 inline-block" />
          <span>Origin</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-600 inline-block" />
          <span>Destination</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 inline-block" />
          <span>Attractions</span>
        </div>
      </div>
    </div>
  );
};
