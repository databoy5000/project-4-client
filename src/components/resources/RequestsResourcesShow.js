import { useEffect } from 'react'

function ResourcesShow({ header, requestsData, resourcesData }) {
  const humanResources = requestsData
    .filter((resource) => resource.resource.resourceType === 'Human')
  const materialResources = requestsData
    .filter((resource) => resource.resource.resourceType === 'Material')

  const isError = !humanResources && !resourcesData && !resourcesData

  useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestsData])

  return (
    <div>
      {isError && <p>...something went wrong!</p>}
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
                <div className="form-group border m-4 p-4 shadow text-center">
                  <h4>Human Resources</h4>
                  {humanResources && humanResources.map((request, index) => (
                    <div className="text-center" key={request.id}>
                      <br/>
                      <div className="row border shadow-sm">
                        <label className="badge bg-dark fs-5">
                          {request.resource.resourceName}s:
                        </label>
                        <div className="row">
                          <div className="col mt-3">
                            <h6>Requested:</h6>
                            <p className="requests" id={request.id}>
                              {request.quantity}
                            </p>
                          </div>
                          <div className="col mt-3">
                            <h6>My offer:</h6>
                            <p className="resources" id={resourcesData[index].id}>
                              {resourcesData[index].quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-4">
                <div className="form-group border m-4 p-4 shadow text-center">
                  <h4>Material Resources</h4>
                  {materialResources && materialResources.map((request, index) => (
                    <div className="text-center" key={request.id}>
                      <br />
                      <div className="row shadow-sm">
                        <label className="badge bg-dark fs-5">
                          {request.resource.resourceName}:
                        </label>
                        <div className="col mt-3">
                          <h6 className="">Requested:</h6>
                          <p className="requests" id={request.id}>
                            {request.quantity}
                          </p>
                        </div>
                        <div className="col mt-3">
                          <h6>My offer:</h6>
                          <p className="resources" id={resourcesData[index].id}>
                            {resourcesData[index].quantity}
                          </p>
                        </div>
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