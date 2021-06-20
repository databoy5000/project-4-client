import { useEffect } from 'react'

function ResourcesShow({ header, requestsData, resourcesData }) {

  const humanResources = requestsData
    .filter((resource) => resource.resource.resourceType === 'Human')
  const materialResources = requestsData
    .filter((resource) => resource.resource.resourceType === 'Material')

  useEffect(() => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestsData])

  return (
    <div>
      {!humanResources && ! humanResources && !resourcesData &&
        'Loading...'
      }
      <div className="container border bg-light shadow-sm mt-5">
        <div className="row justify-content-center">

          <div className="d-grid gap-2 col-8 mx-auto">
            <h2 className="text-center text-uppercase text-wrap text-success m-3">
              {header}
            </h2>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-4">
                <div className="form-group border m-4 p-3 shadow">

                  <h4>Human resources:</h4>
                  {humanResources && humanResources.map((request, index) => (
                    <div key={request.id}>
                      <label className="col-sm-2 col-form-label">
                        {request.resource.resourceName}s:
                      </label>
                      <h6>Resources requests</h6>
                      <h6>Your NGO Resources</h6>
                      <p
                        className="requests"
                        id={request.id}
                      >
                        {request.quantity}
                      </p>
                      <p
                        className="resources"
                        id={resourcesData[index].id}
                      >
                        {resourcesData[index].quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-4">
                <div className="form-group border m-4 p-3 shadow">
                  <h4>Material resources:</h4>
                  {materialResources && materialResources.map((request, index) => (
                    <div key={request.id}>
                      <label className="col-sm-2 col-form-label">
                        {request.resource.resourceName}:
                      </label>
                      <h6>Resources requests</h6>
                      <h6>Your NGO Resources</h6>
                      <p
                        className="requests"
                        id={request.id}
                      >
                        {request.quantity}
                      </p>
                      <p
                        className="resources"
                        id={resourcesData[index + 5].id}
                      >
                        {resourcesData[index + 5].quantity}
                      </p>
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