import React, { useEffect, useState } from 'react'
import useForm from '../hooks/useForm'
import { useHistory } from 'react-router-dom'
import { createNGOResources, getResourceNamesTypes } from '../lib/api'
import { ngoResourcesForm } from '../lib/defaultForms'

function ResourcesCreate() {
  const [ humanResources, setHumanResources ] = useState(null)
  const [ materialResources, setMaterialResources ] = useState(null)

  const { formDara, setFormData, formErrors, setFormErrors, handleChange } = useForm(ngoResourcesForm)

  useEffect(() => {
    const getData = async () => {
      try {
        const resResources = await getResourceNamesTypes
        const humanResources = resResources.data
          .filter((resource) => resource.resourceType === 'Human')
        const materialResources = resResources.data
          .filter((resource) => resource.resourceType === 'Material')

        setHumanResources(humanResources)
        setMaterialResources(materialResources)
      } catch (err) {
        setFormErrors({ ...formErrors, apiError: err.response.data })
      }
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
    </div>
  )
}

export default ResourcesCreate