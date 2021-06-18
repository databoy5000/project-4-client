import { useState, useEffect, useRef, useCallback } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

import { publicToken } from '../../lib/mapbox'

function MapGL({ crises }) {

  const mapRef = useRef()

  const [ isMapBoxError, setIsMapboxError ] = useState(false)
  const [ isMapBoxLoading, setIsMapboxLoading ] = useState(false)

  const [ viewport, setViewport ] = useState({
    latitude: 55,
    longitude: 10,
    width: window.innerWidth,
    height: '300px',
    zoom: 2,
  })

  const handleViewportChange = useCallback(
    (viewport) => setViewport(viewport),
    []
  )

  function handleResize() {
    const newWidth = window.innerWidth
    setViewport({
      ...viewport,
      width: newWidth,
    })
  }

  useEffect( () => {
    window.addEventListener('resize', handleResize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[crises])

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
    <div>
      {console.log('***crises: ', crises)}
      {isMapBoxLoading && '... loading map!'}
      {isMapBoxError && '... Oopsies, the map could not load! Check your connexion and reload the page.'}

      <ReactMapGL 
        ref={mapRef}
        {...viewport} 
        mapboxApiAccessToken={publicToken}
        onViewportChange={handleViewportChange}
        onError={handleError}
        onLoading={handleLoading}
        onInit={handleLoaded}
      >

        {!crises && 'Loading map information!'}
        {crises && (crises.map( crisis => 
          <Marker
            key={crisis.id}
            latitude={Number(crisis.latitude)}
            longitude={Number(crisis.longitude)}
          >
            <>
              {console.log('crisis: ', crisis)}
              {console.log('crisis.latitude: ', crisis.latitude)}
              {console.log('crisis.longitude: ', crisis.longitude)}
            </>
            <button
              className="mapButton"
              // onClick={(e) => {
              //   e.preventDefault()
              //   setSelectedMemory(memory)
              // }}
            >

              <img
                className="map-pin"
                src={'../../images/mapbox-icon.png'}
                alt="location pin"
              />

            </button>
            
          </Marker>
        ))}
      </ReactMapGL>

    </div>
  )
}

export default MapGL