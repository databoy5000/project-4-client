import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { getSingleCrisis, getUserNGOResources } from '../lib/api'
import ResourcesShow from '../resources/ResourcesShow'
import MapGL from '../mapbox/MapGL'

function CrisisShow() {

  const { crisisId } = useParams()
  const history = useHistory()


  // * make empty arrays 'false'
  function makeFalseEmptyArray(data) {
    if (data && data.length < 1) {
      return false
    } else {
      return data
    }
  }

  const headerString = 'Resources Needed to Solve this Crisis'
  const [ crisis, setCrisis ] = useState(false)
  const [ isError, setIsError ] = useState(false)

  useEffect( () => {

    const getData = async () => {
      try {
        const res = await getSingleCrisis(crisisId)
        const crisis = res.data

        const ngoResourcesRes = await getUserNGOResources()
        const ngoResources = makeFalseEmptyArray(ngoResourcesRes.data)
  
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

          if (filterCheck) crisis.canHelp = true
          else crisis.canHelp = false

          crisis.dotColour = 'blue-dot'

          return crisis
        }

        const updatedCrisis = setProps()
        setCrisis(updatedCrisis)

      } catch (err) {
        console.log('err.response.data: ', err.response.data)
        setIsError(true)
      }
    }
    getData()
  },[crisisId])

  const handleEdit = () => {
    history.push('/editngoresources')
  }

  return (
    <div>
      {console.log('crisis: ', crisis)}
      {isError && 'Oops, something went wrong!'}
      {!crisis ?
        'Loading...'
        :
        <>
          
          <ResourcesShow header={headerString} resourcesData={crisis.requests} />

          <MapGL crisesData={crisis} selectedCrisisId={false} />
          
          <button onClick={handleEdit}>
            Edit NGO Resources
          </button>
        </>
      }
    </div>
  )
}

export default CrisisShow