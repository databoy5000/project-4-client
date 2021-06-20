import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { getUserCrisis, hsPath } from '../lib/api'
import { crisesPath } from '../lib/api'
import { getPayLoad } from '../lib/auth'
import MapGL from '../mapbox/MapGL'


function HSDashboard() {

  const history = useHistory()

  const [ userCrises, setUserCrises ] = useState(null)
  const [ selectedCrisisId, setSelectedCrisisId ] = useState(null)

  useEffect( () => {
    const getData = async () => {
      const userId = getPayLoad().sub
      const res = await getUserCrisis(userId)

      // * make empty array false
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
    }
    getData()
  },[])


  const handleClick = (crisisId) => {
    history.push(`/${hsPath}/${crisesPath}/${crisisId}`)
  }

  const handlePin = (e) => {
    setSelectedCrisisId(e.target.id)
  }

  return (
    <>
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
              userCrises.map( (crisis, index) => (
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
                  <td id={crisis.id}>{crisis.isSolved ? 'Classified' : 'Ongoing' }</td>
                  <td>
                    <button className="btn btn-danger" onClick={ () => handleClick(crisis.id)}>
                      See Details
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {!userCrises &&
          <div className={ !userCrises ? 'div-no-data' : '' }>* No data to display *</div>
        }
        
        <MapGL crisesData={userCrises} selectedCrisisId={selectedCrisisId} />

      </div>
    </>
  )
}

export default HSDashboard