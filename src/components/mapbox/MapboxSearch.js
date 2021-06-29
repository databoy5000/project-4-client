import { useRef, useState, useCallback } from 'react'
import ReactMapGl from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { publicToken } from '../lib/mapbox'

function MapboxSearch({ onResult }) {
  const mapRef = useRef()
  const [isMapBoxError, setIsMapboxError] = useState(false)
  const [isMapBoxLoading, setIsMapboxLoading] = useState(false)

  const [viewport, setViewport] = useState({
    latitude: 54.405,
    longitude: 9.431,
    width: '500px',
    height: '500px',
    zoom: 2,
  })

  const handleViewportChange = useCallback(
    (viewport) => setViewport(viewport),
    []
  )

  const handleResult = (e) => {
    onResult(e.result)
  }

  const handleLoading = () => {
    setIsMapboxLoading(true)
  }

  const handleError = () => {
    setIsMapboxError(true)
  }

  const handleLoaded = () => {
    setIsMapboxLoading(false)
  }

  return (
    <div className="d-flex justify-content-evenly">
      {isMapBoxLoading && <p>... loading map!</p>}
      {isMapBoxError && <p>... the map could not load! Check your connexion and/or reload the page.</p>}
      <ReactMapGl 
        ref={mapRef}
        {...viewport} 
        mapboxApiAccessToken={publicToken}
        onViewportChange={handleViewportChange}
        onError={handleError}
        onLoading={handleLoading}
        onInit={handleLoaded}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={publicToken}
          position="top-left"
          onResult={handleResult}
          onError={handleError}
        />
      </ReactMapGl>
    </div>
  )
}

export default MapboxSearch