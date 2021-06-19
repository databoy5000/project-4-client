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
      {/* {console.log('formData: ', formData)} */}
      <form 
        className=""
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label className="label">Email</label>
          <input
            className="input"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            onFocus={handleFocus}
          />
        </div>
        <div className="mb-3">
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {isError && <p className="">Incorrect details. Please try again!</p>}
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">Log in</button>
        </div>
      </form>
    </section>
  )
}

export default Login