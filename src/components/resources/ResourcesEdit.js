import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import useForm from '../hooks/useForm'
import { editNGOResources, getUserNGOResources } from '../lib/api'
import { ngoResourcesErrorForm, ngoResourcesForm } from '../lib/defaultForms'

function ResourcesEdit() {
  const history = useHistory()
  const [ humanResources, setHumanResources ] = useState(null)
  const [ materialResources, setMaterialResources ] = useState(null)
  const { formData, setFormData, formErrors, setFormErrors } = useForm(ngoResourcesForm, ngoResourcesErrorForm)


  useEffect(() => {
    const getData = async () => {
      try {
        const resResources = await getUserNGOResources()
        console.log('resResources', resResources)
        const humanResources = resResources.data
          .filter((element) => element.resource.resourceType === 'Human')
        const materialResources = resResources.data
          .filter((element) => element.resource.resourceType === 'Material')

        console.log('humanResources: ', humanResources)
        console.log('materialResources: ', materialResources)
        setHumanResources(humanResources)
        setMaterialResources(materialResources)
      } catch (err) {
        setFormErrors(err.response.data.errors)
      }
    }
    getData()
  }, [setFormData, setFormErrors])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('updated form', formData)

    try {

      for (let i = 0; i <= formData.resources.length; i++) {
        const quantityToUpdate = formData.resources[i].quantity
        const resourceId = formData.resources[i].resource
        if (quantityToUpdate !== '') {
          const req = await editNGOResources(formData, resourceId)
          console.log('req: ', req)
        }
      }

      // const req = await editNGOResources(formData)
      // console.log('req', req)
      history.push('/dashboard')
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
                Update the resources you possess
              </h2>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-4">
                  <div className="form-group border m-4 p-3 shadow">
                    <h4>Human resources:</h4>
                    {humanResources && humanResources.map((element, index) => (
                      <div key={element.resource.id}>
                        {console.log('element: ', element)}
                        <label className="col-sm-2 col-form-label">
                          {element.resource.resourceName}s:
                        </label>
                        <input
                          className={`
                          form-control fw-light fst-italic
                          ${formErrors.resources[index].quantity ? 'is-invalid' : ''}
                          `}
                          type="number"
                          id={element.resource.id}
                          name={element.resource.resourceName}
                          placeholder="Enter number"
                          // value={formData.resources[index].quantity}
                          defaultValue={element.quantity}
                          onChange={handleNestedChange}
                          onBlur={(e) => handleFormError(e, index, element.resource.resourceType)}
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
                    {materialResources && materialResources.map((element, index) => (
                      <div className={element.resource.resourceType} key={element.resource.id}>
                        <label className="col-sm-2 col-form-label">{element.resource.resourceName}:</label>
                        <input
                          className={`
                            form-control fw-light fst-italic
                            ${formErrors.resources[index + 5].quantity ? 'is-invalid' : ''}
                          `}
                          type="number"
                          id={element.resource.id}
                          name="request"
                          placeholder="Enter number"
                          // value={element.quantity}
                          defaultValue={element.quantity}
                          onChange={handleNestedChange}
                          onBlur={(e) => handleFormError(e, index, element.resource.resourceType)}
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
                Update your resources
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ResourcesEdit