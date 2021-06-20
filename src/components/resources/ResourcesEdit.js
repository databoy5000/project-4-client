import React from 'react'
import { useHistory, useParams } from 'react-router'
import useForm from '../hooks/useForm'
import { ngoResourcesErrorForm, ngoResourcesForm } from '../lib/defaultForms'

function ResourcesEdit() {
  const history = useHistory()
  const { ngoResourcesId } = useParams()
  const { formData, setFormData, formErrors, setFormErrors } = useForm(ngoResourcesForm, ngoResourcesErrorForm)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await 
      }
    }
  })


  return (
    <div>
    Hello World
    </div>
  )
}

export default ResourcesEdit