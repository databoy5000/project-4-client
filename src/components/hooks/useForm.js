import React from 'react'

export default function useForm(initialState) {
  const [formdata, setFormdata] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const handleChange = e => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleMultiSelect = selectedItems => {
    const values = selectedItems ? selectedItems.map(item => item.value) : []
    setFormdata({ ...formdata, categories: values }
    )
  }

  return {
    formdata,
    formErrors,
    setFormdata,
    setFormErrors,
    handleChange,
    handleMultiSelect,
  }
}
