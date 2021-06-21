import { useEffect, useState } from 'react'

function ResourcesShow({ header, resourcesData }) {

  const [ humanResources, setHumanResources ] = useState(null)
  const [ materialResources, setMaterialResources ] = useState(null)

  useEffect(() => {
    const humanResources = resourcesData
      .filter((resource) => resource.resource.resourceType === 'Human')
    const materialResources = resourcesData
      .filter((resource) => resource.resource.resourceType === 'Material')

    setHumanResources(humanResources)
    setMaterialResources(materialResources)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="container border bg-light shadow-sm mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="d-grid gap-2 col-8 mx-auto">
            <h3 className="text-center text-uppercase text-wrap m-3">
              {header}
            </h3>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-4">
                <div className="form-group border m-4 p-3 shadow text-center">
                  <h4>Human resources:</h4>
                  {humanResources && humanResources.map((resource) => (
                    <div key={resource.id}>
                      <br />
                      <div className="row shadow-sm">
                        <label className="badge bg-dark fs-6">
                          {resource.resource.resourceName}:
                        </label>
                        <p id={resource.id}>
                          {resource.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-4">
                <div className="form-group border m-4 p-3 shadow text-center">
                  <h4>Material resources:</h4>
                  {materialResources && materialResources.map((resource) => (
                    <div key={resource.id}>
                      <br />
                      <div className="row shadow-sm">
                        <label className="badge bg-dark fs-6">
                          {resource.resource.resourceName}:
                        </label>
                        <p id={resource.id}>
                          {resource.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcesShow