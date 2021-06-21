import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useForm from '../hooks/useForm'
import { getSingleCrisis, getDisasterTypes, editRequest } from '../lib/api'
import { crisisErrorForm, crisisForm } from '../lib/defaultForms'
import MapboxSearch from '../mapbox/MapboxSearch'
import Error from '../common/Error'
import Loading from '../common/Loading'

function CrisisEdit() {

  // const history = useHistory()
  const [ disasterTypes, setDisasterTypes ] = useState(null)
  const [ humanResources, setHumanResources ] = useState(null)
  const [ materialResources, setMaterialResources ] = useState(null)

  const { crisisId } = useParams()

  const [ isCrisis, setIsCrisis ] = useState(false)
  const [ initialRequests, setInitialRequests ] = useState(null)
  const [ currentRequests, setCurrentRequests ] = useState(null)

  const [ isError, setIsError ] = useState(false)
  const isLoading = !isCrisis && !isError

  const { formData, setFormData, handleChange } = useForm(crisisForm, crisisErrorForm)

  useEffect( () => {

    const getData = async () => {
      try {

        const crisisRes = await getSingleCrisis(crisisId)
        const crisisData = crisisRes.data

        const refactorCrisisForm = (crisisData) => {
          delete crisisData.owner

          const refactoredRequests = crisisData.requests.map( (request) => {

            return {
              requestId: request.id,
              resource: request.resource.id,
              quantity: request.quantity,
            }
          })
          return { ...crisisData, requests: refactoredRequests }
        }

        const updatedCrisisForm = refactorCrisisForm(crisisData)

        const disasterRes = await getDisasterTypes()
        const disasterData = disasterRes.data

        const humanResources = crisisData.requests
          .filter((request) => request.resource.resourceType === 'Human')
        const materialResources = crisisData.requests
          .filter((request) => request.resource.resourceType === 'Material')

        setDisasterTypes(disasterData)
        setHumanResources(humanResources)
        setMaterialResources(materialResources)

        // * just in case, you never know...
        if (updatedCrisisForm) {
          setIsCrisis(true)
        }
        
        const { requests, ...currentCrisisForm } = updatedCrisisForm
        setFormData(currentCrisisForm)

        setInitialRequests(requests)
        setCurrentRequests(requests)

      } catch (err) {
        console.log('err: ', err)
        setIsError(true)
      }
    }
    getData()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[crisisId])

  const handleRequests = (e) => {
    const updatedRequests = currentRequests.map( (request) => {
      if (request.requestId === Number(e.target.id)) {
        return {
          ...request,
          quantity: Number(e.target.value),
        }
      }
      return request
    })
    setCurrentRequests(updatedRequests)
  }

  const handleRadio = () => {
    setFormData({ ...formData, isSolved: !formData.isSolved })
  }

  const handleResult = e => {
    function getCountry() {
      if (e.place_type[0] === 'country') {
        return e.text
      }
      const hierarchyLastIndex = e.context[e.context.length - 1]
      const technicallyACountryName = hierarchyLastIndex.text
      return technicallyACountryName
    }

    const sanitisedLongitudeDecimal = Number(e.center[0].toFixed(6))
    const sanitisedLatitudeDecimal = Number(e.center[1].toFixed(6))

    setFormData({ ...formData,
      longitude: sanitisedLongitudeDecimal,
      latitude: sanitisedLatitudeDecimal,
      placeName: e.text,
      country: getCountry(),
      placeType: e.place_type[0],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('---submitting')

    console.log('initialRequests: ', initialRequests)
    console.log('currentRequests: ', currentRequests)



    // const formDataCopy = { ...formData }
    // const { requests, ...crisisFormSubmission } = formDataCopy

    // const requestForms = requests.map( (request) => {
    //   delete request.requestId
    //   return request
    // })

    currentRequests.forEach( async (request, index) => {
      const initialQuantity = initialRequests[index].quantity
      const updatedQuantity = request.quantity
      if (initialQuantity !== updatedQuantity) {
        console.log('Updating request: ', request)
        console.log('crisisId: ', crisisId)
        try {
          const req = await editRequest(updatedQuantity, crisisId)
          console.log('req: ', req)
        } catch (err) {
          console.log('err: ', err)
          setIsError(true)
        }
      }
    })



    // try {
    //   const req = await editCrisis(formData)
    //   console.log('req: ', req)
    //   // history.push('/dashboard')
    // } catch (err) {
    //   setIsError(true)
    // }
  }

  return (
    <div>
      {isError && <Error/>}
      {isLoading && <Loading/>}
      {isCrisis &&
        <form onSubmit={handleSubmit}>
          {console.log('formData: ', formData)}
          {console.log('currentRequests: ', currentRequests)}
          <div className="container border bg-light shadow-sm mt-5 mb-5">
            <div className="row justify-content-center">
              <div className="d-grid gap-2 col-8 mx-auto">
                <h2 className="text-center text-uppercase text-wrap text-danger m-3">
                  Update your crisis
                </h2>
                <div className="form-group border m-4 p-3 shadow">
                  <div className="filter-radio text-center">
                    <input
                      type="radio"
                      name="filterCheck"
                      className="form-check-input"
                      onChange={handleRadio}
                      checked={formData.isSolved === false}
                    /> 
                    <label className="form-check-label">
                      Ongoing
                    </label>
                    <div></div>
                    <input
                      type="radio"
                      name="filterCheck"
                      className="form-check-input"
                      onChange={handleRadio}
                      checked={formData.isSolved === true}
                    /> 
                    <label className="form-check-label">
                      Classified
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">
                      Disaster type:
                    </label>
                    <select
                      className="form-control"
                      name="disasterType"
                      onChange={handleChange}
                      defaultValue={formData.disasterType}
                    >
                      {disasterTypes &&
                        disasterTypes.map((disasterType) => (
                          <option
                            key={disasterType}
                            value={disasterType}
                          >
                            {disasterType}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="col-form-label">Disaster location:</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter disaster area on map"
                      name="placeName"
                      value={formData.placeName || ''}
                      onSubmit={handleResult}
                      disabled
                    />
                  </div>
                  <MapboxSearch onResult={handleResult}/>
                  <div className="mt-3 mb-3">
                    <label className="col-form-label">Disaster description:</label>
                    <textarea
                      className="form-control"
                      type="text"
                      placeholder="Description"
                      name="disasterDescription"
                      defaultValue={formData.disasterDescription}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <h5 className="text-center text-uppercase text-wrap text-danger m-3">
                  Tell NGOs the resources you need
                </h5>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-4">
                    <div className="form-group border m-4 p-3 shadow">
                      <h4>Human resources:</h4>
                      {humanResources && humanResources.map( (resourceObject) => (
                        <div key={resourceObject.id} className={resourceObject.resource.resourceType}>
                          <label className="col-sm-2 col-form-label">
                            {resourceObject.resource.resourceName}s:
                          </label>
                          <input
                            className="form-control fw-lighter fst-italic"
                            type="number"
                            id={resourceObject.id}
                            name="request"
                            placeholder="Enter number"
                            defaultValue={resourceObject.quantity}
                            onChange={handleRequests}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group border m-4 p-3 shadow">
                      <h4>Material resources:</h4>
                      {materialResources && materialResources.map( (resourceObject) => (
                        <div key={resourceObject.id} className={resourceObject.resource.resourceType} >
                          <label className="col-sm-2 col-form-label">
                            {resourceObject.resource.resourceName}:
                          </label>
                          <input
                            className="form-control fw-lighter fst-italic"
                            type="number"
                            id={resourceObject.id}
                            name="request"
                            placeholder="Enter number"
                            defaultValue={resourceObject.quantity}
                            onChange={handleRequests}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto m-4">
              <button className="btn btn-danger" type="submit">
                Update your alert
              </button>
            </div>
          </div>
        </form>
      }

    </div>
  )
}

export default CrisisEdit