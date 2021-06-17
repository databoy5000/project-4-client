import React from 'react'
// import { Link } from 'react-router-dom'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import axios from 'axios'
import { baseUrl } from '../lib/api'
import { publicToken } from '../lib/mapbox'

function Home() {

  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCrisis, setSelectedCrisis] = React.useState(null)
  const [crises, setCrises] = React.useState(null)
  const [inputHeight, setInputHeight] = React.useState(40)
  // const navHeight = JSON.parse(localStorage.getItem('navHeight'))
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight - (70 + inputHeight)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !crises && !isError
  const [viewport, setViewport] = React.useState({
    latitude: 54.405,
    longitude: 9.431,
    width: viewportWidth,
    height: viewportHeight,
    zoom: 1.85,
  })

  function handleResize() {
    const navHeight = 70
    const inputHeight = 0
    const headerHeight = 0

    const newWidth = window.innerWidth
    const newHeight = window.innerHeight - (navHeight + inputHeight + headerHeight)
    console.log(window.innerHeight, window.innerWidth)
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

  const getInputHeight = e => {
    console.log(e)
    const inputHeight = e.nativeEvent.path[1].offsetHeight
    setInputHeight(inputHeight)
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
        <h1>WoRCO</h1>
        <h3>World Response Crises Organisation</h3>
      </div>

      {isLoading && <p>...map is loading</p>}

      <div onFocus={getInputHeight}>
        <input 
          className="form-control"
          type="text"
          placeholder="Search a crisis..."
          onChange={handleSearch}
          value={searchTerm || ''}
        />
      </div>

      <div onClick={handleResize}>
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
            </Popup>
          )}

        </ReactMapGl>

      </div>

    </section>

  )
}
export default Home