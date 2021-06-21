import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { crisesPath, editPath, getSingleCrisis, hsPath } from '../lib/api'
import ResourcesShow from '../resources/ResourcesShow'
import MapGL from '../mapbox/MapGL'
import { isCreator } from '../lib/auth'
import Error from '../common/Error'
import Loading from '../common/Loading'

function CrisisShowHS() {

  const { crisisId } = useParams()
  const history = useHistory()

  const headerString = 'Resources Needed to Solve this Crisis'
  const [ crisis, setCrisis ] = useState(false)
  const [ isError, setIsError ] = useState(false)
  const isLoading = !crisis && !isError

  const [ isOwner, setIsOwner ] = useState(false)

  useEffect( () => {

    const getData = async () => {
      try {
        const res = await getSingleCrisis(crisisId)
        const crisis = res.data
        crisis.dotColour = 'red-dot'

        setCrisis(crisis)
        setIsOwner(isCreator(crisis.owner.id))

      } catch (err) {
        console.log('err.response.data: ', err.response.data)
        setIsError(true)
      }
    }
    getData()
  },[crisisId])

  const handleRedirect = () => {
    history.push(`/${hsPath}/${crisesPath}/${crisisId}/${editPath}`)
  }

  return (
    <div>
      {isError && <Error/>}
      {isLoading && <Loading/>}
      {crisis &&
        <>
          <h2 className="text-center text-uppercase text-wrap text-danger m-3">
            Crisis at: {crisis.placeName}
          </h2>
          <MapGL crisesData={crisis} selectedCrisisId={false} />
          <div className="container mt-3">
            <div className="row justify-content-center">
              <div className="d-grid gap-2 col-6 mx-auto">
                <div className="form-group border m-4 p-3 shadow text-center">
                  <div className="row">
                    <label className="badge bg-secondary fs-5">Disaster type:</label> 
                    <p className="fs-5">{crisis.disasterType}</p>
                  </div>
                  <div className="row">
                    <label className="badge bg-secondary fs-5">Status:</label> 
                    <p className="fs-5">{`${crisis.isSolved ? 'Classified' : 'Ongoing'}`}</p>
                  </div>
                  <div className="row">
                    <label className="badge bg-secondary fs-5">Location:</label> 
                    <p className="fs-5">{crisis.placeName}</p>
                  </div>
                  <div className="row">
                    <label className="badge bg-secondary fs-5">Country:</label> 
                    <p className="fs-5">{crisis.country}</p>
                  </div>
                  <div className="row">
                    <label className="badge bg-secondary fs-5">Description:</label> 
                    <p className="fs-5">{crisis.disasterDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <ResourcesShow header={headerString} resourcesData={crisis.requests} />
          
          {isOwner && 
          <div className="d-grid gap-2 col-6 mx-auto m-4">
            <button className="btn btn-danger" onClick={handleRedirect}>
              Edit Crisis
            </button>
          </div>
          }
        </>
      }
    </div>
  )
}

export default CrisisShowHS