import React from 'react'

interface AvatarMarkerProps {
  isWalking: boolean
}

export const AvatarMarker: React.FC<AvatarMarkerProps> = ({ isWalking }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={isWalking ? 'animate-bounce' : ''}
    >
      <circle cx="20" cy="20" r="18" fill="#3f8ae0" />
      <circle cx="20" cy="20" r="15" fill="white" />
      {/* Add your custom avatar content here */}
      <circle cx="20" cy="20" r="12" fill="#3f8ae0" />
    </svg>
  )
}
