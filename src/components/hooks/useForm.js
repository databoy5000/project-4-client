import { useState } from 'react' 

export default function useForm(initialState, initialFormError) {

  if (!initialFormError) {
    initialFormError = initialState
  }
  
  const [formData, setFormData] = useState(initialState)
  const [formErrors, setFormErrors] = useState(initialFormError)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleMultiSelect = (selectedItems) => {
    const values = selectedItems ? selectedItems.map( (item) => item.value) : []
    setFormData({ ...formData, categories: values }
    )
  }

  return {
    formData,
    formErrors,
    setFormData,
    setFormErrors,
    handleChange,
    handleMultiSelect,
  }
}
