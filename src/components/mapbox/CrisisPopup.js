import { Popup } from 'react-map-gl'
import { useEffect, useState } from 'react'

import { crisesPath, hsPath } from '../lib/api'
import { useHistory } from 'react-router'

function CrisisPopup({ crisesData, selectedCrisisId, passState }) {

  const history = useHistory()
  const [ currentCrisis, setCurrentCrisis ] = useState(false)
  const [ subSelectedCrisisId, setSubSelectedCrisisId ] = useState(false)

  useEffect( () => {

    if (selectedCrisisId) {
      const filteredCrisis = crisesData.filter( (crisis) => {
        return Number(selectedCrisisId) === Number(crisis.id)
      })
      setCurrentCrisis(filteredCrisis[0])
    }

    setSubSelectedCrisisId(selectedCrisisId)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedCrisisId])

  const handleRedirect = () => {
    history.push(`${hsPath}/${crisesPath}/${currentCrisis.id}/`)
  }

  const handleClose = () => {
    passState(false)
  }

  return (
    <div>
      {subSelectedCrisisId &&
        <Popup
          latitude={Number(currentCrisis.latitude)}
          longitude={Number(currentCrisis.longitude)}
        >
          <div>
            <div onClick={handleRedirect}>
              <p>Disaster: {currentCrisis.disasterType}</p>
              <p>Country: {currentCrisis.country}</p>
              <p>Location: {currentCrisis.placeName}</p>
              <p>Logged by: {currentCrisis.username}</p>

              <img
                width="250px"
                height="150px"
                src={'fake url'}
                alt={currentCrisis.country}
              />
            
              <br></br>
            </div>
            <button
              onClick={handleClose}
            >
              Close
            </button>
          </div>

        </Popup>
      }

    </div>
  )
}

export default CrisisPopup