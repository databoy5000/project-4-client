import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// import { Marker } from 'react-map-gl'

import { getUserCrisis } from '../lib/api'
import { crisesPath } from '../lib/api'
import { getPayLoad } from '../lib/auth'
import MapGL from '../mapbox/MapGL'


function HSDashboard() {

  const history = useHistory()

  const [ userCrises, setUserCrises ] = useState(null)

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
      setUserCrises(crisesArray())
    }
    getData()
  },[])


  const handleClick = (crisisId) => {
    history.push(`/${crisesPath}/${crisisId}`)
  }

  // const handlePinData = () => {
  //   passData(userCrises)
  // }


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
                  // onClick={handlePin}
                >
                  <th scope="row">{index}</th>
                  <td>{crisis.disasterType}</td>
                  <td>{crisis.placeName}</td>
                  <td>{crisis.country}</td>
                  <td>{crisis.isSolve ? 'Ongoing' : 'Classified'}</td>
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
        {!userCrises &&
          <div className={ !userCrises ? 'div-no-data' : '' }>* No data to display *</div>
        }
        {console.log('---userCrises: ', userCrises)}
        <MapGL crises={userCrises} />

      </div>
    </>
  )
}

export default HSDashboard