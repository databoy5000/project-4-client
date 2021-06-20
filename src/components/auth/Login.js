import React from 'react'
import useForm from '../hooks/useForm'
import { useHistory } from 'react-router'
import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'

function Login() {
  const history = useHistory()
  const [isError, setIsError] = React.useState(false)
  const { formData, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginUser(formData)
      setToken(res.data.token)
      history.push('/')
    } catch (err) {
      // console.log('err.response.data: ', err.response.data)
      setIsError(true)
    }
  }
  const handleFocus = () => {
    setIsError(false)
  }

  return (
    <section className="">
      {/* {console.log('formData: ', formData)}
      {console.log('formErrors: ', formErrors)} */}
      <form 
        className=""
        onSubmit={handleSubmit}
      >
        <div className="container border bg-light shadow-sm mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="d-grid gap-2 col-8 mx-auto">
              <h2 className="text-center text-uppercase text-wrap text-primary m-3">
                Log in to WoRCO
              </h2>
              <div className="form-group border m-4 p-3 shadow">
                <div>
                  <label className="col-form-label">Email:</label>
                  <input
                    className="form-control fw-light fst-italic"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onFocus={handleFocus}
                  />
                </div>
                <div>
                  <label className="col-form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control fw-light fst-italic"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onFocus={handleFocus}
                  />
                  {isError && <p className="">Incorrect details. Please try again!</p>}
                </div>
              </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto m-4">
              <button className="btn btn-primary" type="submit">Log in</button>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Login