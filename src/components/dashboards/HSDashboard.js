import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Marker } from 'react-map-gl'

import { getUserCrisis } from '../lib/api'
import { crisesPath } from '../lib/api'
import { getPayLoad } from '../lib/auth'
import MapGL from '../mapbox/MapGL'


function HSDashboard() {

  
  const history = useHistory()

  const [ userCrises, setUserCrises ] = useState(null)



  useEffect( () => {
    const getData = async () => {
      const res = await getUserCrisis(getPayLoad().sub)
      console.log('res: ', res.data)
      setUserCrises(res.data)
    }
    getData()
  },[])


  const handleClick = (crisisId) => {
    history.push(`/${crisesPath}/${crisisId}`)
  }

  // const handlePin = () => {

  // }


  return (
    <>
      <div className="crisis-list">

        <table className="table">
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

        <MapGL
          setMarkersPopups={
            userCrises && userCrises.map( (crisis) => {
              <Marker
                key={crisis.id}
                latitude={crisis.latitude}
                longitude={crisis.longitude}
              >
                <>
                  {console.log('crisis: ', crisis)}
                  {console.log('crisis.latitude: ', crisis.latitude)}
                  {console.log('crisis.longitude: ', crisis.longitude)}
                </>
                <button
                  className="map-button"
                  // onClick={(e) => {
                  //   e.preventDefault()
                  //   setSelectedMemory(memory)
                  // }}
                >

                  <img
                    height="40px"
                    width="40px"
                    src="https://i.imgur.com/6IzPeVa.png"
                    alt="red location pin"
                  />

                </button>
                
              </Marker>
            })
          }
        />

      </div>
    </>
  )
}

export default HSDashboard