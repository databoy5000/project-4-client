import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { getSingleCrisis, getUserNGOResources } from '../lib/api'
import RequestsResourcesShow from '../resources/RequestsResourcesShow'
import MapGL from '../mapbox/MapGL'
import { isCreator } from '../lib/auth'
import Error from '../common/Error'
import Loading from '../common/Loading'

function CrisisShowNGO() {

  // * make empty arrays 'false'
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
  const [ crisis, setCrisis ] = useState(false)
  const [ isError, setIsError ] = useState(false)
  const isLoading = !crisis && !isError

  const [ ngoUserResources, setNGOUserResources ] = useState(false)

  const [ isOwner, setIsOwner ] = useState(false)

  useEffect( () => {

    const getData = async () => {
      try {
        const res = await getSingleCrisis(crisisId)
        const crisis = res.data

        const ngoResourcesRes = await getUserNGOResources()
        const ngoResources = makeFalseEmptyArray(ngoResourcesRes.data)

        const sortedNGOResources = ngoResources.sort( (a, b) => {
          return a.resource.id - b.resource.id
        })

        setNGOUserResources(sortedNGOResources)
  
        const setProps = () => {
          const filterCheck = crisis.requests.every( (request, index) => {

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
        console.log('err.response.data: ', err.response.data)
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
          <p>Disaster type: {crisis.disasterType}</p>
          <p>Status: {`${crisis.isSolved ? 'Classified' : 'Ongoing'}`}</p>
          <p>Location: {crisis.placeName}</p>
          <p>Country: {crisis.country}</p>
          <p>Description: {crisis.disasterDescription}</p>
          
          {crisis && ngoUserResources &&
            <RequestsResourcesShow header={headerString} requestsData={crisis.requests} resourcesData={ngoUserResources} />
          }

          <MapGL crisesData={crisis} selectedCrisisId={false} />
          
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