import { useRef, useState, useCallback } from 'react'
import ReactMapGl from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

import { publicToken } from '../../lib/mapbox'

function MapboxSearch({ onResult }) {

  const mapRef = useRef()

  const [ isMapBoxError, setIsMapboxError ] = useState(false)
  const [ isMapBoxLoading, setIsMapboxLoading ] = useState(false)

  //* Display map size, and position/zoom within the map
  const [ viewport, setViewport ] = useState({
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

    <section className="geocoder">
      <div className="card">    
        <div className="columns">
          <div className="column">
            <div className="column">
              <div className="bd-notification is-info">

                {isMapBoxLoading && '... loading map!'}
                {isMapBoxError && '... Oopsies, the map could not load! Check your connexion and reload the page.'}

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
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default MapboxSearch