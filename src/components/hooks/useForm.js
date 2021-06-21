import { useState } from 'react' 

export default function useForm(initialState, initialFormError) {

  if (!initialFormError) {
    initialFormError = initialState
  }
  
  const [formData, setFormData] = useState(initialState)
  const [formErrors, setFormErrors] = useState(initialFormError)

  const handleChange = (e) => {
    // console.log('e.target: ', e.target)
    // console.log('e.target.name: ', e.target.name)
    // console.log('e.target.value: ', e.target.value)
    
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleMultiSelect = (selectedItems) => {
    const values = selectedItems ? selectedItems.map( (item) => item.value) : []
    setFormData({ ...formData, categories: values })
  }

  const handleImageUpload = file => {
    setFormData({ ...formData, profilePictureUrl: file })
  }

  return {
    formData,
    formErrors,
    setFormData,
    setFormErrors,
    handleChange,
    handleMultiSelect,
    handleImageUpload,
  }
}
