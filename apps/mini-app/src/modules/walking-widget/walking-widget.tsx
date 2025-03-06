import L from 'leaflet'
import React, { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

import type { GeoPosition } from '@/data'

interface WalkingMapProps {
  currentPosition: GeoPosition | null
  positions: GeoPosition[]
  isWalking: boolean
  avatarUrl?: string
}

export const WalkingWidget: React.FC<WalkingMapProps> = ({
  currentPosition,
  positions,
  isWalking,
  avatarUrl,
}) => {
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const polylineRef = useRef<L.Polyline | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current)
      return

    mapRef.current = L.map(mapContainerRef.current, { attributionControl: false, zoomControl: false }).setView([55.751244, 37.618423], 15) // Default to Moscow

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(mapRef.current)

    polylineRef.current = L.polyline([], {
      color: '#3f8ae0',
      weight: 5,
      opacity: 0.7,
    }).addTo(mapRef.current)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current)
      return

    const customIcon = L.icon({
      iconUrl: avatarUrl || '/avatar-marker.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      className: isWalking ? 'walking-avatar animate-bounce' : 'standing-avatar',
    })

    if (currentPosition) {
      const position: L.LatLngExpression = [currentPosition.lat, currentPosition.long]

      if (markerRef.current) {
        markerRef.current.setLatLng(position)
        markerRef.current.setIcon(customIcon)
      }
      else {
        markerRef.current = L.marker(position, { icon: customIcon }).addTo(mapRef.current)
      }

      mapRef.current.panTo(position)
    }
  }, [currentPosition, isWalking, avatarUrl])

  useEffect(() => {
    if (!polylineRef.current || positions.length === 0)
      return

    const latLngs = positions.map(pos => [pos.lat, pos.long] as L.LatLngExpression)
    polylineRef.current.setLatLngs(latLngs)
  }, [positions])

  return (
    <div className="h-[70vh] absolute w-full overflow-hidden top-[7vh]" ref={mapContainerRef}></div>
  )
}
