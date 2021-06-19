import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import useForm from '../hooks/useForm'
import { getDisasterTypes, createCrisis, getResourceNamesTypes } from '../lib/api'
import { crisisErrorForm, crisisForm } from '../lib/defaultForms'
import MapboxSearch from '../mapbox/MapboxSearch.js'


function CrisisCreate() {

  const history = useHistory()
  const [ disasterTypes, setDisasterTypes ] = useState(null)
  const [ humanResources, setHumanResources ] = useState(null)
  const [ materialResources, setMaterialResources ] = useState(null)

  const { formData, setFormData, formErrors, setFormErrors, handleChange } = useForm(crisisForm, crisisErrorForm)

  useEffect(() => {
    const getData = async () => {
      try {
        const resDisaster = await getDisasterTypes()
        setDisasterTypes(resDisaster.data)

        const resResources = await getResourceNamesTypes()

        const humanResources = resResources.data
          .filter( (resource) => resource.resourceType === 'Human')
        const materialResources = resResources.data
          .filter( (resource) => resource.resourceType === 'Material')

        setHumanResources(humanResources)
        setMaterialResources(materialResources)

      } catch (err) {
        setFormErrors({ ...formErrors, apiError: err.response.data })
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNestedChange = (e) => {
    for (let i = 0; i <= formData.requests.length; i++) {
      if (formData.requests[i].resource === Number(e.target.id)) {
        const requestsCopy = [ ...formData.requests ]
        requestsCopy[i]  = { ...requestsCopy[i], quantity: e.target.value }
        setFormData({ ...formData, requests: requestsCopy })
        return
      }
    }
  }

  const handleResult = (e) => {
    
    function getCountry() {
      if (e.place_type[0] === 'country') {
        return e.place_type[0]
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
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const req = await createCrisis(formData)
      console.log('req: ', req)

      history.push('/dashboard')
    } catch (err) {
      setFormErrors({ ...formErrors, ...err.response.data })
    }
  }

  const handleFormError = (e, index, resourceType) => {

    if (e.target.name !== 'request') {
      setFormErrors({ ...formErrors, [e.target.name]: '' })
    } else {

      let currentIndex = index

      if (resourceType === 'Material') {
        currentIndex = index + 5
      }

      const requestsCopy = [ ...formErrors.requests ]
      requestsCopy[currentIndex]  = { ...requestsCopy[currentIndex], quantity: '' }
      setFormErrors({ ...formErrors, requests: requestsCopy })
    }
  }


  return (
    <>
      <form
        className=""
        onSubmit={handleSubmit}
      >
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">
            Disaster type:
          </label>
          <select
            className={`
              form-control
              ${formErrors.disasterType ? 'is-invalid' : ''}
            `}
            name="disasterType"
            onChange={handleChange}
            onBlur={handleFormError}
          >
            <option value="">--------</option>
            {disasterTypes &&
              disasterTypes.map((disasterType) => (
                <option key={disasterType} value={disasterType}>{disasterType}</option>
              ))
            }
          </select>
          <p className="invalid-feedback">Select a disaster type.</p>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Disaster location:</label>
          <input
            className={`
              form-control
              ${formErrors.latitude || formErrors.longitude ? 'is-invalid' : ''}
            `}
            type="text"
            placeholder="Enter disaster area on map"
            name="placeName"
            onBlur={handleFormError}
            value={formData.placeName || ''}
            onSubmit={handleResult}
            disabled
          />
          <p className="invalid-feedback">
            {formErrors.longitude || formErrors.latitude ? 'A location is required' : ''}
          </p>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Disaster description:</label>
          <textarea
            className={`
              form-control
              ${formErrors.disasterDescription ? 'is-invalid' : ''}
            `}
            type="text"
            placeholder="Description"
            name="disasterDescription"
            onChange={handleChange}
            onBlur={handleFormError}
          />
          <p className="invalid-feedback">
            {formErrors.disasterDescription}
          </p>
        </div>
        
        <h2>Tell NGOs how many of each resources you need!</h2>

        <div className="form-group row">
          {humanResources &&
            humanResources.map( (resource, index) => (
              <div className={resource.resourceType} key={resource.id}>
                <label className="col-sm-2 col-form-label">
                  {resource.resourceName}s:
                </label>
                {console.log('formErrors: ', formErrors)}
                <input
                  className={`
                    form-control
                    ${formErrors.requests[index].quantity ? 'is-invalid' : ''}
                  `}
                  type="number"
                  id={resource.id}
                  name="request"
                  placeholder="Enter number"
                  onChange={handleNestedChange}
                  onBlur={(e) => handleFormError(e, index, resource.resourceType)}
                />
                <p className="invalid-feedback">
                  {formErrors.requests[index].quantity}
                </p>
              </div>
            ))
          }
        </div>

        <div className="form-group row">
          {materialResources &&
            materialResources.map( (resource, index) => (
              <div className={resource.resourceType} key={resource.id}>
                <label className="col-sm-2 col-form-label">{resource.resourceName}</label>
                <input
                  className={`
                    form-control
                    ${formErrors.requests[index + 5].quantity ? 'is-invalid' : ''}
                  `}
                  type="number"
                  id={resource.id}
                  name="request"
                  placeholder="Enter number"
                  onChange={handleNestedChange}
                  onBlur={(e) => handleFormError(e, index, resource.resourceType)}
                />
                <p className="invalid-feedback">
                  {formErrors.requests[index + 5].quantity}
                </p>
              </div>
            ))
          }
        </div>

        <MapboxSearch onResult={handleResult}/>

        <button type="submit">
          Now let the world know you&apos;re f#*!ed!
        </button>

      </form>
    </>  )
}

export default CrisisCreate