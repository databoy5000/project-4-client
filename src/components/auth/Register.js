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
    // console.log('submitted formdata', formData)
    try {
      await registerUser(formData)
      history.push('/login')
    } catch (err) {
      console.log(err.response.data)
      setFormErrors(err.response.data)
    }
  }

  // console.log('formdata', formData)

  return (
    <section>
      <form
        className=""
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label className="form-label">Select if you are :</label>
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
          <div className="mb-3">
            <label className="form-label">As a help-seeker, please enter your country:</label>
            <input 
              className="form-control" 
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
          <label className="form-label" htmlFor="username">Username</label>
          <input 
            className="form-control" 
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
          <label className="form-label">Email address</label>
          <input 
            className="form-control" 
            name="email"
            id="email"
            placeholder="name@example.com"
            onChange={handleChange}
          />
          {formErrors.email && <p className="">Email is required!</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            className="form-control" 
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {formErrors.password && <p className="">Password is required!</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password confirmation</label>
          <input 
            className="form-control" 
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="Password confirmation"
            onChange={handleChange}
          />
          {formErrors.passwordConfirmation && <p className="">Does not match password!</p>}
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">Register</button>
        </div>
      </form>
    </section>
  )
}

export default Register