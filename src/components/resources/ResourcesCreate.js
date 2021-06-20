import { useEffect, useState } from 'react'
import useForm from '../hooks/useForm'
// import { useHistory } from 'react-router-dom'
import { createNGOResources, getResourceNamesTypes } from '../lib/api'
import { ngoResourcesErrorForm, ngoResourcesForm } from '../lib/defaultForms'

function ResourcesCreate() {

  // const history = useHistory()
  const [ humanResources, setHumanResources ] = useState(null)
  const [ materialResources, setMaterialResources ] = useState(null)

  const { formData, setFormData, formErrors, setFormErrors } = useForm(ngoResourcesForm, ngoResourcesErrorForm)

  useEffect(() => {
    const getData = async () => {
      try {
        const resResources = await getResourceNamesTypes()
        const humanResources = resResources.data
          .filter((resource) => resource.resourceType === 'Human')
        const materialResources = resResources.data
          .filter((resource) => resource.resourceType === 'Material')

        setHumanResources(humanResources)
        setMaterialResources(materialResources)
      } catch (err) {
        setFormErrors({ ...formErrors, apiError: err.response })
      }
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNestedChange = e => {
    for (let i = 0; i <= formData.resources.length; i++) {
      if (formData.resources[i].resource === Number(e.target.id)) {
        const availableCopy = [ ...formData.resources ]
        availableCopy[i] = { ...availableCopy[i], quantity: e.target.value }
        setFormData({ ...FormData, resources: availableCopy })
        return
      }
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    console.log('submitted form', formData)
    try {
      await createNGOResources(formData)
      window.location.reload()
    } catch (err) {
      console.log(err.response.data)
      setFormErrors({ ...formErrors, resources: err.response.data })
    }
  }

  const handleFormError = (e, index, resourceType) => {
    let currentIndex = index

    if (resourceType === 'Material') {
      currentIndex = index + 5
    }

    const availableCopy = [ ...formErrors.resources ]
    availableCopy[currentIndex] = { ...availableCopy[currentIndex], quantity: '' }
    setFormErrors({ ...formErrors, resources: availableCopy })
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
      >
        <div className="container border bg-light shadow-sm mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="d-grid gap-2 col-8 mx-auto">
              <h2 className="text-center text-uppercase text-wrap text-success m-3">
                Tell us about the resources you possess
              </h2>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-4">
                  <div className="form-group border m-4 p-3 shadow">
                    <h4>Human resources:</h4>
                    {humanResources && humanResources.map((resource, index) => (
                      <div key={resource.id}>
                        <label className="col-sm-2 col-form-label">
                          {resource.resourceName}s:
                        </label>
                        <input
                          className={`
                          form-control fw-light fst-italic
                          ${formErrors.resources[index].quantity ? 'is-invalid' : ''}
                          `}
                          type="number"
                          id={resource.id}
                          name="request"
                          placeholder="Enter number"
                          onChange={handleNestedChange}
                          onBlur={(e) => handleFormError(e, index, resource.resourceType)}
                        />
                        <p className="invalid-feedback">
                          {formErrors.resources[index].quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group border m-4 p-3 shadow">
                    <h4>Material resources:</h4>
                    {materialResources && materialResources.map((resource, index) => (
                      <div className={resource.resourceType} key={resource.id}>
                        <label className="col-sm-2 col-form-label">{resource.resourceName}:</label>
                        <input
                          className={`
                            form-control fw-light fst-italic
                            ${formErrors.resources[index + 5].quantity ? 'is-invalid' : ''}
                          `}
                          type="number"
                          id={resource.id}
                          name="request"
                          placeholder="Enter number"
                          onChange={handleNestedChange}
                          onBlur={(e) => handleFormError(e, index, resource.resourceType)}
                        />
                        <p className="invalid-feedback">
                          {formErrors.resources[index + 5].quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-2"></div>
              </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto m-4">
              <button className="btn btn-success" type="submit">
                Save your resources
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ResourcesCreate