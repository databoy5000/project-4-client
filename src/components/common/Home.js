import { useState, useEffect } from 'react'
import axios from 'axios'
import Error from './Error'
import { crisesPath } from '../lib/api'
import { baseUrl } from '../../config'
import MapGLHomepage from '../mapbox/MapGLHomepage'

function Home() {

  const [searchTerm, setSearchTerm] = useState('')
  const [crises, setCrises] = useState(null)

  const navHeight = 100
  const inputHeight = 70
  const headerHeight = 66
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight - (navHeight + inputHeight + headerHeight)

  const [isError, setIsError] = useState(false)
  const isLoading = !crises && !isError

  const [viewport, setViewport] = useState({
    latitude: 54.5260,
    longitude: 15.2551,
    width: viewportWidth,
    height: viewportHeight,
    zoom: 1.25,
  })

  function handleResize() {
    const newWidth = window.innerWidth
    const newHeight = window.innerHeight - (navHeight + inputHeight + headerHeight)
    setViewport({ ...viewport, width: newWidth, height: newHeight })
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const crisesRes = await axios.get(`${baseUrl}/${crisesPath}`)
        const setDotColoursProp = (crises) => {
          return crises.map( (crisis) => {
            crisis.dotColour = 'red-dot'
            return crisis
          })
        }
        const updatedCrises = setDotColoursProp(crisesRes.data)
        setCrises(updatedCrises)
        console.log(
          '%c  -- GA Project: WoCRO --','font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)', '\n',
          'Hi there, thanks for checking out this project.', '\n',
          'I\'m currently looking for employement opportunities.', '\n',
          'Feel free to get in touch if you\'d like to have a chat!', '\n',
          '{', '\n',
          '  name: \'Anthony Graham\',', '\n',
          '  peopleCallMe: \'🐜\',', '\n',
          '  title', ': \'Junior Software Engineer\',', '\n',
          '  github: \'https://github.com/databoy5000\',', '\n',
          '  linkedin: \'https://www.linkedin.com/in/anthonygdev/\',', '\n',
          '  readMe: \'\',', '\n',
          '}'
        )
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = e => {
    setSearchTerm(e.target.value)
  }

  const filteredCrises = crises?.filter(crisis => {
    return (
      crisis.placeName.toLowerCase().includes(searchTerm) ||
      crisis.country.toLowerCase().includes(searchTerm) ||
      crisis.placeType.toLowerCase().includes(searchTerm) ||
      crisis.disasterType.toLowerCase().includes(searchTerm) ||
      crisis.disasterDescription.toLowerCase().includes(searchTerm) ||
      crisis.owner.username.toLowerCase().includes(searchTerm)
    )
  })

  return (
    <section>
      {isError && <Error />}
      {isLoading && <p>...map is loading</p>}
      {crises && 
        <div className="map-homepage">
          <div>
            <h1 className="text-center m-3">WoCRO</h1>
            <h3 className="text-center m-3">World Crises Response Organisation</h3>
          </div>
          <div>
            <input 
              className="form-control fw-light fst-italic"
              type="text"
              placeholder="Search a crisis by location, disaster type or keyword"
              onChange={handleSearch}
              value={searchTerm || ''}
            />
          </div>
          <MapGLHomepage crisesData={filteredCrises} homepageViewport={viewport} />
        </div>
      }
    </section>
  )
}

export default Home