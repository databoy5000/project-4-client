import useForm from '../hooks/useForm'
import { registerUser } from '../lib/api'
import { useHistory } from 'react-router-dom'
import ImageUpload from '../hooks/imageUpload'
import { isNGO, setToken } from '../lib/auth'

function Register() {
  const history = useHistory()
  const { formData, formErrors, setFormErrors, handleChange, handleImageUpload } = useForm({
    userType: '',
    country: '',
    username: '',
    profilePictureUrl: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleFormError = (e) => {
    if (e.target.name === 'country') {
      setFormErrors({ ...formErrors, country: '' }) 
    } else {
      setFormErrors({ ...formErrors, [e.target.name]: '' }) 
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.userType === 'NGO') {
      formData.country = ''
    }

    if (formData.profilePictureUrl === '') {
      formData.profilePictureUrl = 'https://i.imgur.com/6da62wI.png?1'
    }

    try {

      const res = await registerUser(formData)
      setToken(res.data.token)

      if (isNGO()) {
        history.push('/ngo/dashboard/')
      } else {
        history.push('/hs/dashboard/')
      }
      
    } catch (err) {

      if (formData.userType === 'Help-seeker' && formData.country === '') {
        setFormErrors({ ...formErrors,
          ...err.response.data,
          country: ['This field may not be blank.'],
        })
      } else {
        setFormErrors({ ...formErrors, ...err.response.data })
      }

    }
  }

  return (
    <div>
      <form
        className=""
        onSubmit={handleSubmit}
      >
        <div className="container border bg-light shadow-sm mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="d-grid gap-2 col-8 mx-auto">
              <h2 className="text-center text-uppercase text-wrap text-primary m-3">
                If you need help or can help, <br />just sign up!
              </h2>
              <div className="form-group border m-4 p-3 shadow">
                <div>
                  <label className="col-form-label">Select if you are :</label>
                  <br/>
                  <div className="form-check form-check-inline">
                    <input 
                      type="radio"
                      className={`
                        form-check-input
                        ${formErrors.userType ? 'is-invalid' : ''}
                      `}
                      name="userType"
                      value="Help-seeker"
                      onChange={handleChange}
                      checked={formData.userType === 'Help-seeker'}
                      onBlur={handleFormError}
                    />
                    <label className="form-check-label">
                      Help-seeker
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input 
                      type="radio"
                      className={`
                        form-check-input
                        ${formErrors.userType ? 'is-invalid' : ''}
                      `}
                      name="userType"
                      value="NGO"
                      onChange={handleChange}
                      checked={formData.userType === 'NGO'}
                      onBlur={handleFormError}
                    />
                    <label className="form-check-label">
                      NGO
                    </label>
                  </div>
                  {formErrors.userType && ( 
                    <p className="custom-invalid">Choose your user type.</p>
                  )}
                </div>
                {formData.userType === 'Help-seeker' ?
                  <div>
                    <label className="col-form-label">As a help-seeker, please enter your country:</label>
                    <input 
                      className={`
                      form-control fw-light fst-italic
                        ${formErrors.country ? 'is-invalid' : ''}
                      `}
                      name="country"
                      id="country"
                      placeholder="Country"
                      onChange={handleChange}
                      onBlur={handleFormError}
                    />
                    {formErrors.country && ( 
                      <p className="custom-invalid">{formErrors.country}</p>
                    )}
                  </div>
                  :
                  ''
                }
                <div className="mb-3">
                  <label className="col-form-label" htmlFor="username">Username:</label>
                  <input 
                    className={`
                      form-control fw-light fst-italic
                      ${formErrors.username ? 'is-invalid' : ''}
                    `}
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={handleChange}
                    onBlur={handleFormError}
                  />
                  {formErrors.username && ( 
                    <p className="custom-invalid">{formErrors.username}</p>
                  )}
                </div>
                <div className="mb-3">
                  <ImageUpload onUpload={handleImageUpload} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Email address:</label>
                  <input 
                    className={`
                      form-control fw-light fst-italic
                      ${formErrors.email ? 'is-invalid' : ''}
                    `}
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    onChange={handleChange}
                    onBlur={handleFormError}
                  />
                  {formErrors.email &&
                    <p className="custom-invalid">{formErrors.email}</p>
                  }
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Password:</label>
                  <input 
                    className={`
                      form-control fw-light fst-italic
                      ${formErrors.password ? 'is-invalid' : ''}
                    `}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleFormError}
                  />
                  {formErrors.password &&
                    <p className="custom-invalid">{formErrors.password}</p>
                  }
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Password confirmation:</label>
                  <input 
                    className={`
                      form-control fw-light fst-italic
                      ${formErrors.passwordConfirmation ? 'is-invalid' : ''}
                    `}
                    type="password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    placeholder="Password confirmation"
                    onChange={handleChange}
                    onBlur={handleFormError}
                  />
                  {formErrors.passwordConfirmation &&
                    <p  className="custom-invalid">{formErrors.passwordConfirmation}</p>
                  }
                </div>
              </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto m-4">
              <button className="btn btn-primary" type="submit">Register</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register