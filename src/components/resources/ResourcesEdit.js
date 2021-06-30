import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import useForm from '../hooks/useForm'
import { editNGOResources, getUserNGOResources } from '../lib/api'
import { ngoResourcesErrorForm, editNGOResourcesForm } from '../lib/defaultForms'
import Error from '../common/Error'
import Loading from '../common/Loading'

function ResourcesEdit() {
  const history = useHistory()

  const [humanResources, setHumanResources] = useState(null)
  const [materialResources, setMaterialResources] = useState(null)
  const { formData, setFormData } = useForm(editNGOResourcesForm, ngoResourcesErrorForm)

  const [isError, setIsError] = useState(false)
  const isLoading = !humanResources && !materialResources && !isError

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getUserNGOResources()
        const resResources = res.data

        resResources.sort((a, b) => {
          return a.resource.id - b.resource.id
        })

        const updatedResources = resResources.map( (resResource) => {
          const matchedResource = editNGOResourcesForm.resources.filter( (formResource) => {
            return formResource.resource === resResource.resource.id
          })
          return { ...matchedResource[0], id: resResource.id }
        })

        const humanResources = resResources
          .filter((element) => element.resource.resourceType === 'Human')
        const materialResources = resResources
          .filter((element) => element.resource.resourceType === 'Material')

        setFormData({ ...formData, resources: updatedResources })
        setHumanResources(humanResources)
        setMaterialResources(materialResources)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNestedChange = (e) => {
    for (let i = 0; i < formData.resources.length; i++) {
      if (formData.resources[i].resource === Number(e.target.id)) {
        const resourceCopy = [ ...formData.resources ]
        resourceCopy[i] = { ...resourceCopy[i],
          quantity: e.target.value,
        }

        setFormData({ ...FormData, resources: resourceCopy })
        return
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      for (let i = 0; i < formData.resources.length; i++) {
        const ngoResourceId = formData.resources[i].id
        const resourceId = formData.resources[i].resource
        const quantityToUpdate = formData.resources[i].quantity

        const reqObject = {
          resource: resourceId,
          quantity: quantityToUpdate,
        }

        if (quantityToUpdate !== '') {
          await editNGOResources(reqObject, ngoResourceId)
        }
      }

      history.push('/ngo/dashboard')
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <div>
      {isError && <Error/>}
      {isLoading && <Loading/>}
      <form onSubmit={handleSubmit}>
        <div className="container border bg-light shadow-sm mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="d-grid gap-2 col-8 mx-auto">
              <h2 className="text-center text-uppercase text-wrap text-success m-3">
                Update my NGO resources
              </h2>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-4">
                  <div className="form-group border m-4 p-3 shadow">
                    <h4>Human resources:</h4>
                    {humanResources && humanResources.map((element) => (
                      <div key={element.id}>
                        <label className="col-sm-2 col-form-label">
                          {element.resource.resourceName}s:
                        </label>
                        <input
                          className="form-control fw-light fst-italic"
                          type="number"
                          id={element.resource.id}
                          name={element.resource.resourceName}
                          placeholder="Enter number"
                          defaultValue={element.quantity}
                          onChange={handleNestedChange}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group border m-4 p-3 shadow">
                    <h4>Material resources:</h4>
                    {materialResources && materialResources.map((element) => (
                      <div className={element.resource.resourceType} key={element.id}>
                        <label className="col-sm-2 col-form-label">
                          {element.resource.resourceName}:
                        </label>
                        <input
                          className="form-control fw-light fst-italic"
                          type="number"
                          id={element.resource.id}
                          name="request"
                          placeholder="Enter number"
                          defaultValue={element.quantity}
                          onChange={handleNestedChange}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-2"></div>
              </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto m-4">
              <button className="btn btn-success" type="submit">
                Update my resources
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ResourcesEdit