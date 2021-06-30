import { Popup } from 'react-map-gl'
import { useEffect, useState } from 'react'
import { crisesPath } from '../lib/api'
import { useHistory } from 'react-router'

function CrisisPopup({ crisesData, selectedCrisisId, passState }) {
  const history = useHistory()
  const [currentCrisis, setCurrentCrisis] = useState(false)
  const [subSelectedCrisisId, setSubSelectedCrisisId] = useState(false)

  useEffect(() => {
    if (selectedCrisisId) {
      const filteredCrisis = crisesData.filter( (crisis) => {
        return Number(selectedCrisisId) === Number(crisis.id)
      })
      setCurrentCrisis(filteredCrisis[0])
    }

    setSubSelectedCrisisId(selectedCrisisId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCrisisId])

  const handleRedirect = () => {
    history.push(`/${crisesPath}/${currentCrisis.id}/`)
  }

  const handleClose = () => {
    passState(false)
  }

  return (
    <div>
      {subSelectedCrisisId &&
        <Popup
          className="shadow"
          latitude={Number(currentCrisis.latitude)}
          longitude={Number(currentCrisis.longitude)}
        >
          <div className="form-group text-center p-1">
            <div onClick={handleRedirect}>
              <label className="badge bg-danger fs-5">
                Disaster: {currentCrisis.disasterType}
              </label> 
              <p></p>
              <label className="badge bg-secondary fs-6">Country:</label> 
              <p className="fs-6">{currentCrisis.country}</p>
              <label className="badge bg-secondary fs-6">Location:</label> 
              <p className="fs-6">{currentCrisis.placeName}</p>
              <label className="badge bg-secondary fs-6">Logged by:</label> 
              <p className="fs-6">{currentCrisis.owner.username}</p>
              <img
                width="100px"
                height="100px"
                src={currentCrisis.owner.profilePictureUrl}
                alt={currentCrisis.country}
              />
              <br></br>
            </div>
            <div className="mx-auto mt-1">
              <button 
                className="btn btn-dark"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </Popup>
      }
    </div>
  )
}

export default CrisisPopup