import { useState, useEffect, useRef, useCallback } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

import { publicToken, defaultViewport } from '../lib/mapbox'


function MapGL({ crisesData, selectedCrisisId }) {

  console.log('MAPGL crisesData: ', crisesData)

  function makeSingleObjectArray(data) {
    console.log('inside makeSingle....')

    console.log('data: ', data)
    console.log('typeof data: ', typeof data)

    if (typeof data === 'undefined' || data === null) {
      console.log('its undefined')
      return false
    }

    if (data.id) {
      console.log('in IF')
      return new Array(data)
    } else {
      console.log('inside ELSE')
      return data
    }
  }

  const mapRef = useRef()
  const [ crises, setCrises ] = useState(false)
  const [ isMapBoxError, setIsMapboxError ] = useState(false)
  const [ isMapBoxLoading, setIsMapboxLoading ] = useState(false)

  const [ viewport, setViewport ] = useState(
    defaultViewport(
      makeSingleObjectArray(crisesData)
    ))

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
    setCrises(makeSingleObjectArray(crisesData))
  },[crisesData])

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
      {/* {console.log('***crises: ', crises)}
      {console.log('selectedCrisisId: ', selectedCrisisId)} */}
      {isMapBoxLoading && '... loading map!'}
      {isMapBoxError && '... Oopsies, the map could not load! Check your connexion and reload the page.'}
      {console.log('MAPGL render crises: ', crises)}
      <ReactMapGL 
        ref={mapRef}
        {...viewport} 
        mapboxApiAccessToken={publicToken}
        onViewportChange={handleViewportChange}
        onError={handleError}
        onLoading={handleLoading}
        onInit={handleLoaded}
      >
        {/* {!crises && 'Loading map...'} */}
        {/* {console.log('MapGL RETURN crises: ', typeof crises, crises.length, crises)} */}

        {(crises && crises.length >= 1) && (crises.map( (crisis) =>
          <Marker
            key={crisis.id}
            latitude={Number(crisis.latitude)}
            longitude={Number(crisis.longitude)}
            offsetLeft={-10}
            offsetTop={-12}
          >
            {console.log('---MARKER crisis: ', crisis)}
            {console.log('---MARKER crisis: ', Number(crisis.latitude))}
            {console.log('---MARKER crisis: ', Number(crisis.longitude))}
            {console.log('Number(selectedCrisisId) === crisis.id: ', Number(selectedCrisisId) === crisis.id)}
            {/* {console.log('MapGL RETURN crisis.dotColour: ', crisis.dotColour)} */}
            <div
              id={`${
                Number(selectedCrisisId) === crisis.id ?
                  'blue-dot'
                  :
                  crisis.dotColour
              }`}
              className="pulsatingDot"
            />
          </Marker>
        ))}
      </ReactMapGL>

    </div>
  )
}

export default MapGL