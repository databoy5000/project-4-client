import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getUserCrisis } from '../lib/api'
import { crisesPath } from '../lib/api'
import { getPayLoad } from '../lib/auth'
import MapGL from '../mapbox/MapGL'
import Error from '../common/Error'
import Loading from '../common/Loading'

function HSDashboard() {
  const history = useHistory()

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight / 2

  const [viewport, setViewport] = useState({
    latitude: 30,
    longitude: 0,
    width: viewportWidth,
    height: viewportHeight,
    zoom: 1.85,
  })

  const [userCrises, setUserCrises] = useState(null)
  const [selectedCrisisId, setSelectedCrisisId] = useState(null)
  const [isError, setIsError] = useState(false)
  const isLoading = !userCrises && !isError

  useEffect(() => {
    const getData = async () => {

      try {
        const userId = getPayLoad().sub
        const res = await getUserCrisis(userId)
        
        const crisesArray = () => {
          if (res.data && res.data.length < 1) {
            return false
          } else {
            return res.data
          }
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
  
        const stageOneUpdatedCrisis = crisesArray()
  
        if (stageOneUpdatedCrisis) {
          const stageTwoUpdatedCrisis = setDotColoursProp(stageOneUpdatedCrisis)
          setUserCrises(stageTwoUpdatedCrisis)
        } else setUserCrises(stageOneUpdatedCrisis)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

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

  const handleClick = (crisisId) => {
    history.push(`/${crisesPath}/${crisisId}`)
  }

  const handlePin = (e) => {
    setSelectedCrisisId(e.target.id)
  }
  
  return (
    <>
      {isError && <Error/>}
      {isLoading && <Loading/>}
      <h2 className="text-center text-uppercase text-wrap m-3">
        My crises
      </h2>
      <MapGL
        crisesData={userCrises}
        selectedCrisisId={selectedCrisisId}
        homepageViewport={viewport}
      />
      <div className="crisis-list">
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
            {userCrises &&
              userCrises.map((crisis, index) => (
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
                  <td id={crisis.id}>{crisis.isSolved ? 'Classified' : 'Ongoing'}</td>
                  <td>
                    <button 
                      className="btn btn-danger" 
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
        {!userCrises &&
          <div className={ !userCrises ? 'div-no-data' : '' }>
            * No data to display *
          </div>
        }
      </div>
    </>
  )
}

export default HSDashboard