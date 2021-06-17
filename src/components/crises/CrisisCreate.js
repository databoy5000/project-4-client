import { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'

import useForm from '../hooks/useForm'
import { getDisasterTypes, createCrisis, getResourceNamesTypes } from '../lib/api'
import { crisisErrorForm, crisisForm } from '../lib/defaultForms'
import MapboxSearch from '../mapbox/MapboxSearch.js'


function CrisisCreate() {

  // const history = useHistory()
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
        console.log('err.response.data: ', err.response.data)
        setFormErrors({ ...crisisErrorForm, apiError: err.response.data })
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNestedChange = (e) => {
    for (let i = 0; i <= crisisForm.requests.length; i++) {
      if (formData.requests[i].resource === Number(e.target.id)) {
        const requestsCopy = [ ...formData.requests ]
        requestsCopy[i].quantity = e.target.value
        setFormData({ ...formData, requests: requestsCopy })
        return
      }
    }
  }

  const handleResult = (e) => {

    function getCountry(resultArray) {
      const hierarchyLastIndex = resultArray[resultArray.length - 1]
      const technicallyACountryName = hierarchyLastIndex.text
      return technicallyACountryName
    }
    setFormData({ ...formData,
      placeName: e.text,
      country: getCountry(e.context),
      longitude: e.center[0],
      latitude: e.center[1],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const req = await createCrisis(formData)
      console.log('req: ', req)

      // ! Send to user dashboard
      // history.push('/dashboard')
    } catch (err) {
      console.log(err.response.data)
      // ! doesn't work the way we want it to
      setFormErrors(err.response.data)
    }
  }

  return (
    <>
      {console.log('formData: ', formData)}
      {console.log('formErrors: ', formErrors)}

      <form
        className=""
        onSubmit={handleSubmit}
      >
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Disaster type:</label>
          <select
            className="form-control"
            name="disasterType"
            onChange={handleChange}
          >
            <option value="">--------</option>
            {disasterTypes &&
              disasterTypes.map((disasterType) => (
                <option key={disasterType} value={disasterType}>{disasterType}</option>
              ))
            }
          </select>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Disaster location:</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter disaster area on map"
            name="placeName"
            onChange={() => {
              setFormErrors({ ...crisisErrorForm, placeName: '' })
            }}
            value={formData.placeName || ''}
            onSubmit={handleResult}
            required
            disabled
          />
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Disaster description:</label>
          <textarea
            className="form-control"
            type="text"
            placeholder="Description"
            name="disasterDescription"
            onChange={handleChange}
            required
          />
        </div>
        
        <h2>Tell NGOs how many of each resources you need!</h2>

        <div className="form-group row">
          {humanResources &&
            humanResources.map( (resource) => (
              <div className={resource.resourceType} key={resource.id}>
                <label className="col-sm-2 col-form-label">{resource.resourceName}s:</label>
                <input
                  className="form-control"
                  type="number"
                  id={resource.id}
                  placeholder="Enter number"
                  onChange={handleNestedChange}
                  required/>
              </div>
            ))
          }
        </div>

        <div className="form-group row">
          {materialResources &&
            materialResources.map( (resource) => (
              <div className={resource.resourceType} key={resource.id}>
                <label className="col-sm-2 col-form-label">{resource.resourceName}</label>
                <input
                  className="form-control"
                  type="number"
                  id={resource.id}
                  placeholder="Enter number"
                  onChange={handleNestedChange}
                  required
                />
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