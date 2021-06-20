import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { getAllCrises, getUserNGOResources } from '../lib/api'
import { crisesPath } from '../lib/api'
import MapGL from '../mapbox/MapGL'
import ResourcesShow from '../resources/ResourcesShow'

function NGODashboard() {

  // * make empty arrays 'false'
  function makeFalseEmptyArray(data) {
    if (data && data.length < 1) {
      return false
    } else {
      return data
    }
  }

  const history = useHistory()
  const showCrises = ['All', 'Filtered']
  const headerString = 'Your NGO Resources'

  const [ crises, setCrises ] = useState([])
  const [ filteredCrises, setFilteredCrises ] = useState([])
  const [ displayCrises, setDisplayCrises ] = useState([])
  const [ selectedCrisisId, setSelectedCrisisId ] = useState(false)
  const [ ngoResources, setNGOResources ] = useState(false)

  const [ isError, setIsError ] = useState(false)

  useEffect( () => {

    const getData = async () => {
      try {
        const crisesRes = await getAllCrises()
        const crises = makeFalseEmptyArray(crisesRes.data)

        const ngoResourcesRes = await getUserNGOResources()
        console.log('ngoResourcesRes: ', ngoResourcesRes)
        const sanitizedNGOResources = makeFalseEmptyArray(ngoResourcesRes.data)
        console.log('sanitizedNGOResources: ', sanitizedNGOResources)
        setNGOResources(sanitizedNGOResources)

  
        const setCanHelpProp = (crises) => {
          return crises.map( (crisis) => {
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

        const stageOneUpdatedCrisis = setCanHelpProp(crises)

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

        const stageTwoUpdatedCrisis = setDotColoursProp(stageOneUpdatedCrisis)
        setCrises(stageTwoUpdatedCrisis)
        setDisplayCrises(stageTwoUpdatedCrisis)

        const filterCanHelp = stageTwoUpdatedCrisis.filter( (crisis) => crisis.canHelp)
        setFilteredCrises(filterCanHelp)

      } catch (err) {
        console.log('err.response.data: ', err.response)
        setIsError(true)
      }
    }
    getData()
  },[])

  const handleChange = (e) => {
    if (e.target.id === showCrises[0]) {
      setDisplayCrises(crises)
    } else if (e.target.id === showCrises[1]) {
      setDisplayCrises(filteredCrises)
    }
  }

  const handleClick = (crisisId) => {
    history.push(`/${crisesPath}/${crisisId}`)
  }

  const handlePin = (e) => {
    setSelectedCrisisId(e.target.id)
  }

  const handleEdit = () => {
    history.push('/editcrisis')
  }

  return (
    <>
      {/* {console.log('displayCrises: ', displayCrises)} */}
      {isError && 'Oops, something went wrong...'}
      {!displayCrises && 'Loading...'}
      
      <div className="ngo-dashboard-div">

        <div>
          <p>Show crises:</p>
          <input
            type="radio"
            name="filterCheck"
            className="form-check-input"
            id={showCrises[0]}
            onChange={handleChange}
            checked={displayCrises === crises}
          /> Show all crises

          <input
            type="radio"
            name="filterCheck"
            className="form-check-input"
            id={showCrises[1]}
            onChange={handleChange}
            checked={displayCrises === filteredCrises}
          /> Scope crises we can help with

        </div>

        <h4>Map Legend</h4>
        <div>
          <div className="pulsatingDot" id='red-dot'/>
          <p>Crises you cannot solve</p>
        </div>
        <div>
          <div className="pulsatingDot" id='green-dot'/>
          <p>Crises you can solve</p> 
        </div>
        <div>
          <div className="pulsatingDot" id='blue-dot'/>
          <p>Crises you have selected</p>
        </div>

        <MapGL
          crisesData={displayCrises}
          selectedCrisisId={selectedCrisisId}
        />

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
              displayCrises.map( (crisis, index) => (
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
                    <button onClick={ () => handleClick(crisis.id)}>
                      See Details
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {!displayCrises &&
          <div className={ !displayCrises ? 'div-no-data' : '' }>* No data to display *</div>
        }

        {ngoResources &&
          <ResourcesShow header={headerString} resourcesData={ngoResources} />
        }
        
        <button onClick={handleEdit}>
          Edit NGO Resources
        </button>

      </div>
    </>
  )

}

export default NGODashboard