import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { getAllCrises, getUserNGOResources } from '../lib/api'
import { crisesPath } from '../lib/api'
import MapGL from '../mapbox/MapGL'

function NGODashboard() {

  // * make empty array false
  function makeFalseEmptyArray(data) {
    if (data && data.length < 1) {
      return false
    } else {
      return data
    }
  }

  const history = useHistory()

  const showCrises = ['All', 'Filtered']

  const [ crises, setCrises ] = useState([])
  const [ filteredCrises, setFilteredCrises ] = useState([])
  const [ displayCrises, setDisplayCrises ] = useState([])
  const [ selectedCrisisId, setSelectedCrisisId ] = useState([])

  const [ isError, setIsError ] = useState(false)

  useEffect( () => {

    const getData = async () => {
      try {
        const crisesRes = await getAllCrises()
        const crises = makeFalseEmptyArray(crisesRes.data)
  
        const ngoResourcesRes = await getUserNGOResources()
        const ngoResources = makeFalseEmptyArray(ngoResourcesRes.data)
  
        const includeCanHelpProp = (crises) => {
          return crises.map( (crisis) => {
            const requests = crisis.requests
            const filterCheck = requests.every( (request, index) => {

              const crisisResource = request.resource.id
              const ngoResource = ngoResources[index].resource.id

              const crisisResourceQuantity = request.quantity
              const ngoResourceQuantity = ngoResources[index].quantity

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

        const updatedCrisis = includeCanHelpProp(crises)
        console.log('updatedCrisis: ', updatedCrisis)

        setCrises(updatedCrisis)
        setDisplayCrises(updatedCrisis)

        const filterCanHelp = updatedCrisis.filter( (crisis) => crisis.canHelp)
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

  return (
    <>
      {console.log('displayCrises: ', displayCrises)}
      {isError && 'Oops, something went wrong...'}
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

        <MapGL
          crises={displayCrises}
          selectedCrisisId={selectedCrisisId}
        />

        <table className="table hs-dashboard-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Type</th>
              <th scope="col">Place</th>
              <th scope="col">Country</th>
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

      </div>
    </>
  )

}

export default NGODashboard