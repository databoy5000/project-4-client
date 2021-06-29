import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getSingleCrisis, getUserNGOResources } from '../lib/api'
import RequestsResourcesShow from '../resources/RequestsResourcesShow'
import MapGLHomepage from '../mapbox/MapGLHomepage'
import { isCreator } from '../lib/auth'
import Error from '../common/Error'
import Loading from '../common/Loading'

function CrisisShowNGO() {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight / 2

  const [viewport, setViewport] = useState({
    latitude: 30,
    longitude: 0,
    width: viewportWidth,
    height: viewportHeight,
    zoom: 1.85,
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

  const { crisisId } = useParams()
  const history = useHistory()

  const headerString = 'Resources Needed to Solve this Crisis'
  const [crisis, setCrisis] = useState(false)
  const [isError, setIsError] = useState(false)
  const isLoading = !crisis && !isError

  const [ngoUserResources, setNGOUserResources] = useState(false)

  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleCrisis(crisisId)
        const crisis = res.data

        const ngoResourcesRes = await getUserNGOResources()
        const ngoResources = makeFalseEmptyArray(ngoResourcesRes.data)

        const sortedNGOResources = ngoResources.sort((a, b) => {
          return a.resource.id - b.resource.id
        })

        setNGOUserResources(sortedNGOResources)
  
        const setProps = () => {
          const filterCheck = crisis.requests.every((request, index) => {

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
            crisis.dotColour = 'green-dot'
          } else {
            crisis.canHelp = false
            crisis.dotColour = 'red-dot'
          }

          return crisis
        }

        const updatedCrisis = setProps()

        setIsOwner(isCreator(updatedCrisis.owner.id))
        setCrisis(updatedCrisis)

      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[crisisId])

  const handleEdit = () => {
    history.push('/editcrisis')
  }

  return (
    <div>
      {isError && <Error/>}
      {isLoading && <Loading/>}
      {crisis &&
        <div>
          <h2 className="text-center text-uppercase text-wrap text-danger m-3">
            Crisis at: {crisis.placeName}
          </h2>
          <MapGLHomepage 
            crisesData={crisis} 
            selectedCrisisId={false}
            homepageViewport={viewport} 
          />
          <div className="container mt-3">
            <div className="row justify-content-center">
              <div className="d-grid gap-2 col-6 mx-auto">
                <div className="form-group border m-4 p-3 shadow text-center">
                  <div className="row">
                    <label className="badge bg-secondary fs-5">
                      Disaster type:
                    </label> 
                    <p className="fs-5">{crisis.disasterType}</p>
                  </div>
                  <div className="row">
                    <label className="badge bg-secondary fs-5">
                      Status:
                    </label> 
                    <p className="fs-5">
                      {`${crisis.isSolved ? 'Classified' : 'Ongoing'}`}
                    </p>
                  </div>
                  <div className="row">
                    <label className="badge bg-secondary fs-5">
                      Location:
                    </label> 
                    <p className="fs-5">{crisis.placeName}</p>
                  </div>
                  <div className="row">
                    <label className="badge bg-secondary fs-5">
                      Country:
                    </label> 
                    <p className="fs-5">{crisis.country}</p>
                  </div>
                  <div className="row">
                    <label className="badge bg-secondary fs-5">
                      Description:
                    </label> 
                    <p className="fs-5">{crisis.disasterDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {crisis && ngoUserResources &&
            <RequestsResourcesShow 
              header={headerString} 
              requestsData={crisis.requests} 
              resourcesData={ngoUserResources}
            />
          }
          {isOwner && 
            <button onClick={handleEdit}>
              Edit Crisis
            </button>
          }
        </div>
      }
    </div>
  )
}

export default CrisisShowNGO