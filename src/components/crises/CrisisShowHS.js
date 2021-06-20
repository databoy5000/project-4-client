import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { getSingleCrisis } from '../lib/api'
import ResourcesShow from '../resources/ResourcesShow'
import MapGL from '../mapbox/MapGL'
import { isCreator } from '../lib/auth'

function CrisisShowHS() {

  const { crisisId } = useParams()
  const history = useHistory()

  const headerString = 'Resources Needed to Solve this Crisis'
  const [ crisis, setCrisis ] = useState(false)
  const [ isError, setIsError ] = useState(false)

  const [ isOwner, setIsOwner ] = useState(false)

  useEffect( () => {

    const getData = async () => {
      try {
        const res = await getSingleCrisis(crisisId)
        const crisis = res.data
        crisis.dotColour = 'red-dot'
        console.log('crisis: ', crisis)

        setCrisis(crisis)
        setIsOwner(isCreator(crisis.owner.id))

      } catch (err) {
        console.log('err.response.data: ', err.response.data)
        setIsError(true)
      }
    }
    getData()
  },[crisisId])

  const handleEdit = () => {
    history.push('/hs/editcrisis')
  }

  return (
    <div>
      {isError && 'Oops, something went wrong!'}
      {!crisis ?
        'Loading...'
        :
        <>
          <p>Disaster type: {crisis.disasterType}</p>
          <p>Status: {`${crisis.isSolved ? 'Classified' : 'Ongoing'}`}</p>
          <p>Location: {crisis.placeName}</p>
          <p>Country: {crisis.country}</p>
          <p>Description: {crisis.disasterDescription}</p>
          
          <ResourcesShow header={headerString} resourcesData={crisis.requests} />

          <MapGL crisesData={crisis} selectedCrisisId={false} />
          
          {isOwner && 
            <button onClick={handleEdit}>
              Edit Crisis
            </button>
          }

        </>
      }
    </div>
  )
}

export default CrisisShowHS