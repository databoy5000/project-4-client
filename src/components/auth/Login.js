import React from 'react'
import useForm from '../hooks/useForm'
import { useHistory } from 'react-router'
import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'

function Login() {
  const history = useHistory()
  const [isError, setIsError] = React.useState(false)
  const { formdata, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginUser(formdata)
      setToken(res.data.token)
      history.push('/')
    } catch (err) {
      setIsError(true)
    }
  }
  const handleFocus = () => {
    setIsError(false)
  }

  return (
    <section className="">
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