import { useState, useEffect, useRef, useCallback } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

import { publicToken, defaultViewport } from '../lib/mapbox'
import CrisisPopup from './CrisisPopup'


function MapGLHomepage({ crisesData, homepageViewport }) {

  function makeSingleObjectArray(crisesData) {
    if (typeof crisesData === 'undefined' || crisesData === null) {
      return false
    }

    if (crisesData.id) {
      return new Array(crisesData)
    } else {
      return crisesData
    }
  }

  const mapRef = useRef()
  const [ crises, setCrises ] = useState(false)
  const [ isMapBoxError, setIsMapboxError ] = useState(false)
  const [ isMapBoxLoading, setIsMapboxLoading ] = useState(false)

  const [ selectedCrisisId, setSelectedCrisisId ] = useState(false)

  const [ viewport, setViewport ] = useState(
    defaultViewport(
      makeSingleObjectArray(crisesData),
      homepageViewport
    ))

  useEffect( () => {
    setCrises(makeSingleObjectArray(crisesData))
  },[crisesData])

  useEffect( () => {
    setViewport(homepageViewport)
  },[homepageViewport])

  const handleViewportChange = useCallback(
    (viewport) => setViewport(viewport),
    []
  )

  const handleLoading = () => {
    setIsMapboxLoading(true)
  }

  const handleError = () => {
    setIsMapboxError(true)
  }

  const handleLoaded = () => {
    setIsMapboxLoading(false)
  }

  const handleSelectedPin = (e) => {
    setSelectedCrisisId(e.target.id)
  }

  const handleCrisisSelect = () => {
    setSelectedCrisisId(false)
  }

  return (
    <div>
      {/* {console.log('selectedCrisisId: ', selectedCrisisId)} */}
      {isMapBoxLoading && <p>...loading map!</p>}
      {isMapBoxError && <p>... the map could not load! Check your connexion and/or reload the page.</p>}
      <ReactMapGL 
        ref={mapRef}
        {...viewport} 
        mapboxApiAccessToken={publicToken}
        onViewportChange={handleViewportChange}
        onError={handleError}
        onLoading={handleLoading}
        onInit={handleLoaded}
      >

        {(crises && crises.length >= 1) && (crises.map( (crisis) =>
          <Marker
            key={crisis.id}
            latitude={Number(crisis.latitude)}
            longitude={Number(crisis.longitude)}
            offsetLeft={-10}
            offsetTop={-12}
          >
            
            <div
              className="pulsatingDot red-dot"
              id={crisis.id}
              onClick={handleSelectedPin}
            />

          </Marker>
        ))}

        <CrisisPopup crisesData={crises} selectedCrisisId={selectedCrisisId} passState={handleCrisisSelect} />
      </ReactMapGL>

    </div>
  )
}

export default MapGLHomepage