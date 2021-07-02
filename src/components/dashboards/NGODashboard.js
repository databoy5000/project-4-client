import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAllCrises, getUserNGOResources, ngoPath } from '../lib/api'
import { crisesPath } from '../lib/api'
import MapGL from '../mapbox/MapGL'
import ResourcesShow from '../resources/ResourcesShow'
import ResourcesCreate from '../resources/ResourcesCreate'
import Error from '../common/Error'
import Loading from '../common/Loading'

function NGODashboard() {
  const viewportWidth = window.innerWidth
  const viewportHeight = (window.innerHeight / 2)

  const [viewport, setViewport] = useState({
    latitude: 54.5260,
    longitude: 15.2551,
    width: viewportWidth,
    height: viewportHeight,
    zoom: 1.25,
  })

  function handleResize() {
    const newWidth = window.innerWidth
    const newHeight = window.innerHeight / 2
    setViewport({ ...viewport, 
      width: newWidth, 
      height: newHeight, 
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function makeFalseEmptyArray(data) {
    if (data && data.length < 1) {
      return false
    } else {
      return data
    }
  }

  const history = useHistory()
  const showCrises = ['All', 'Filtered']
  const headerString = 'My NGO Resources'

  const [crises, setCrises] = useState([])
  const [filteredCrises, setFilteredCrises] = useState([])
  const [displayCrises, setDisplayCrises] = useState(null)

  const [selectedCrisisId, setSelectedCrisisId] = useState(false)
  
  const [ngoResources, setNGOResources] = useState(false)
  const [isNGOResources, setIsNGOResources] = useState(null)

  const [isError, setIsError] = useState(false)
  const isLoading = !crises && !isError

  useEffect(() => {
    const getData = async () => {
      try {
        const crisesRes = await getAllCrises()
        const crises = makeFalseEmptyArray(crisesRes.data)
        const ngoResourcesRes = await getUserNGOResources()
        const sanitizedNGOResources = makeFalseEmptyArray(ngoResourcesRes.data)

        if (!sanitizedNGOResources) {
          setIsNGOResources(false)
        } else {
          const sortedNGOResources = sanitizedNGOResources.sort((a, b) => {
            return a.resource.id - b.resource.id
          })
          setNGOResources(sortedNGOResources)
          setIsNGOResources(true)
        }

        const setCanHelpProp = (crises) => {
          return crises.map((crisis) => {
            const requests = crisis.requests
            const filterCheck = requests.every( (request, index) => {
              const crisisResource = request.resource.id
              const ngoResource = sanitizedNGOResources[index].resource.id
              const crisisResourceQuantity = request.quantity
              const ngoResourceQuantity = sanitizedNGOResources[index].quantity
              return (
                crisisResource === ngoResource &&
                crisisResourceQuantity <= ngoResourceQuantity
              )
            })
            if (filterCheck) {
              crisis.canHelp = true
            } else {
              crisis.canHelp = false
            }
            return crisis
          })
        }

        const setDotColoursProp = (crises) => {
          return crises.map( (crisis) => {
            if (crisis.canHelp) {
              crisis.dotColour = 'green-dot'
            } else {
              crisis.dotColour = 'red-dot'
            }
            return crisis
          })
        }

        if (crises && sanitizedNGOResources) {
          const stageOneUpdatedCrisis = setCanHelpProp(crises)
          const stageTwoUpdatedCrisis = setDotColoursProp(stageOneUpdatedCrisis)
          setCrises(stageTwoUpdatedCrisis)
          setDisplayCrises(stageTwoUpdatedCrisis)

          const filterCanHelp = stageTwoUpdatedCrisis.filter((crisis) => crisis.canHelp)
          setFilteredCrises(filterCanHelp)
        } else {
          setDisplayCrises(false)
        }
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  const handleChange = (e) => {
    if (e.target.id === showCrises[0]) {
      setDisplayCrises(crises)
    } else if (e.target.id === showCrises[1]) {
      setDisplayCrises(filteredCrises)
    }
  }

  const handleClick = (crisisId) => {
    history.push(`/${ngoPath}/${crisesPath}/${crisisId}`)
  }

  const handlePin = (e) => {
    setSelectedCrisisId(e.target.id)
  }

  const handleEdit = () => {
    history.push('/ngo/editngoresources')
  }

  return (
    <>
      {isError && <Error/>}
      {isLoading && <Loading/>}
      {typeof displayCrises !== 'boolean' && !displayCrises && 'Loading...'}
      {typeof isNGOResources === 'boolean' &&
        !isNGOResources &&
        <ResourcesCreate />
      }
      {isNGOResources &&
        <div className="ngo-dashboard-div">
          {displayCrises &&
            <div className="radio-legend-map">
              <div className="container">
                <div className="row justify-content-center">
                  <h2 className="text-center text-uppercase text-wrap m-3">
                    Help is needed
                  </h2>
                  <div className="filter-radio text-center">
                    <input
                      type="radio"
                      name="filterCheck"
                      className="form-check-input"
                      id={showCrises[0]}
                      onChange={handleChange}
                      checked={displayCrises === crises}
                    /> 
                    <label className="form-check-label">
                      Show all crises
                    </label>
                    <div></div>
                    <input
                      type="radio"
                      name="filterCheck"
                      className="form-check-input"
                      id={showCrises[1]}
                      onChange={handleChange}
                      checked={displayCrises === filteredCrises}
                    /> 
                    <label className="form-check-label">
                      Scope crises you can help with
                    </label>
                  </div>
                  <div className="col">
                    <div className="form-group border m-4 p-3 shadow">
                      <div className="row">
                        <div className="col-1">
                          <div className="pulsatingDot" id='red-dot'/>
                        </div>
                        <div className="col ms-2">
                          <label className="form-check-label text-danger">
                            Crises you cannot solve
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group border m-4 p-3 shadow">
                      <div className="row">
                        <div className="col-1">
                          <div className="pulsatingDot" id='green-dot'/>
                        </div>
                        <div className="col ms-2">
                          <label className="form-check-label text-success">
                            Crises you can solve
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group border m-4 p-3 shadow">
                      <div className="row">
                        <div className="col-1">
                          <div className="pulsatingDot" id='blue-dot'/>
                        </div>
                        <div className="col-1"></div>
                        <div className="col">
                          <label className="form-check-label text-primary">
                            Selected crises
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {displayCrises !== null &&
            <div className="map-table-ngores">
              <MapGL
                crisesData={displayCrises}
                selectedCrisisId={selectedCrisisId}
                homepageViewport={viewport}
              />
              <div className="table-div">
                <table className="table hs-dashboard-table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Type</th>
                      <th scope="col">Place</th>
                      <th scope="col">Country</th>
                      <th scope="col">Is Solvable?</th>
                      <th scope="col">Status</th>
                      <th scope="col">Detailed View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayCrises &&
                      displayCrises.map((crisis, index) => (
                        <tr
                          key={crisis.id}
                          className="crisis-row"
                          onClick={handlePin}
                        >
                          <th
                            scope="row"
                            id={crisis.id}
                          >
                            {index}
                          </th>
                          <td id={crisis.id}>{crisis.disasterType}</td>
                          <td id={crisis.id}>{crisis.placeName}</td>
                          <td id={crisis.id}>{crisis.country}</td>
                          <td id={crisis.id}>{crisis.canHelp ? 'Yes' : 'No'}</td>
                          <td id={crisis.id}>{crisis.isSolve ? 'Ongoing' : 'Classified'}</td>
                          <td>
                            <button 
                              className="btn btn-outline-dark" 
                              onClick={ () => handleClick(crisis.id)}
                            >
                              See Details
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                {typeof displayCrises === 'boolean' &&
                  !displayCrises &&
                  <div className="div-no-data">
                    * No crises to display *
                  </div>
                }
                {ngoResources &&
                  <div className="row justify-content-center">
                    <ResourcesShow 
                      header={headerString} 
                      resourcesData={ngoResources}
                    />
                    <div className="d-grid gap-2 col-6 mx-auto m-4">
                      <button 
                        className="btn btn-success" 
                        onClick={handleEdit}
                      >
                        Edit my resources
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }
    </>
  )
}

export default NGODashboard