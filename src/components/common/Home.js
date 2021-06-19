import React from 'react'
import { Link } from 'react-router-dom'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import axios from 'axios'

import { baseUrl } from '../lib/api'
import { publicToken } from '../lib/mapbox'

function Home() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCrisis, setSelectedCrisis] = React.useState(null)
  const [crises, setCrises] = React.useState(null)

  const navHeight = 100
  const inputHeight = 170
  const headerHeight = 70
  
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight - (navHeight + inputHeight + headerHeight)

  const [isError, setIsError] = React.useState(false)
  const isLoading = !crises && !isError

  const [viewport, setViewport] = React.useState({
    latitude: 30,
    longitude: 0,
    width: viewportWidth,
    height: viewportHeight,
    zoom: 1.85,
  })

  function handleResize() {
    const newWidth = window.innerWidth
    const newHeight = window.innerHeight - (navHeight + inputHeight)
    // console.log(window.innerHeight, window.innerWidth)
    setViewport({ ...viewport, width: newWidth, height: newHeight })
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/crises`)
        setCrises(res.data)
        handleResize()
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = e => {
    setSearchTerm(e.target.value)
  }
    
  const filteredCrises = crises?.filter(crisis => {
    return (
      crisis.location.toLowerCase().includes(searchTerm) ||
      crisis.disasterType.toLowerCase().includes(searchTerm) ||
      crisis.description.toLowerCase().includes(searchTerm)
    )
  })

  return (
    <section>
      <div>
        <h1 className="text-center m-3">WoRCO</h1>
        <h3 className="text-center m-3">World Response Crises Organisation</h3>
      </div>
      {isLoading && <p>...map is loading</p>}
      <div>
        <input 
          className="form-control fw-light fst-italic"
          type="text"
          placeholder="Search a crisis by location, disaster type or keyword"
          onChange={handleSearch}
          value={searchTerm || ''}
        />
      </div>
      <div 
        onClick={handleResize}
      >
        <ReactMapGl
          {...viewport}
          mapboxApiAccessToken={publicToken}
          onViewportChange={viewport => {
            setViewport(viewport)
          }}
        >
          {filteredCrises && filteredCrises.map(crisis =>
            <Marker
              key={crisis.id}
              longitude={crisis.location.coordinates[0]}
              latitude={crisis.location.coordinates[1]}
            >
              <button
                onClick={e => {
                  e.preventDefault()
                  setSelectedCrisis(crisis)
                }}
              >
                <img 
                  height="50px"
                  width="40px"
                  src="https://i.imgur.com/BiPApuW.jpg"
                  alt="3rd red marker"
                />
              </button>
            </Marker>
          )}
          {selectedCrisis && (
            <Popup
              longitude={selectedCrisis.location.coordinates[0]}
              latitude={selectedCrisis.location.coordinates[1]}
            >
              <h3>{selectedCrisis.location.country}</h3>
              <h5>{selectedCrisis.disasterType}</h5>
              <Link to={`${baseUrl}/crises/${selectedCrisis.id}`}>Go to crisis page</Link>
            </Popup>
          )}
        </ReactMapGl>
      </div>
    </section>
  )
}
export default Home