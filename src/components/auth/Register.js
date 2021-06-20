import useForm from '../hooks/useForm'
import { registerUser } from '../lib/api'
import { useHistory } from 'react-router-dom'
import ImageUpload from '../hooks/imageUpload'

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.userType === 'NGO') {
      formData.country = ''
    }

    if (formData.profilePictureUrl === '') {
      formData.profilePictureUrl = 'https://i.imgur.com/6da62wI.png?1'
    }
    try {
      console.log('submitted formdata', formData)
      await registerUser(formData)
      history.push('/login')
    } catch (err) {
      console.log(err.response.data)
      setFormErrors(err.response.data)
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
                      className="form-check-input"
                      name="userType"
                      value="Help-seeker"
                      onChange={handleChange}
                      checked={formData.userType === 'Help-seeker'}
                    />
                    <label className="form-check-label">
                      Help-seeker
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input 
                      type="radio"
                      className="form-check-input"
                      name="userType"
                      value="NGO"
                      onChange={handleChange}
                      checked={formData.userType === 'NGO'}
                    />
                    <label className="form-check-label">
                      NGO
                    </label>
                  </div>
                </div>
                {formData.userType === 'Help-seeker' ?
                  <div>
                    <label className="col-form-label">As a help-seeker, please enter your country:</label>
                    <input 
                      className="form-control fw-light fst-italic" 
                      name="country"
                      id="country"
                      placeholder="Country"
                      onChange={handleChange}
                    />
                    {formErrors.country && ( 
                      <p className="">{formErrors.country}</p>
                    )}
                  </div>
                  :
                  ''
                }
                <div className="mb-3">
                  <label className="col-form-label" htmlFor="username">Username:</label>
                  <input 
                    className="form-control fw-light fst-italic" 
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={handleChange}
                  />
                  {formErrors.username && ( 
                    <p>{formErrors.username}</p>
                  )}
                </div>
                <div className="mb-3">
                  <ImageUpload onUpload={handleImageUpload} />
                  {formErrors.profilePictureUrl && ( 
                    <p>{formErrors.profilePictureUrl}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Email address:</label>
                  <input 
                    className="form-control fw-light fst-italic" 
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    onChange={handleChange}
                  />
                  {formErrors.email && <p className="">Email is required!</p>}
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Password:</label>
                  <input 
                    className="form-control fw-light fst-italic" 
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  {formErrors.password && <p className="">Password is required!</p>}
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Password confirmation:</label>
                  <input 
                    className="form-control fw-light fst-italic" 
                    type="password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    placeholder="Password confirmation"
                    onChange={handleChange}
                  />
                  {formErrors.passwordConfirmation && <p className="">Does not match password!</p>}
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