import React, { useState } from "react"
import { Auth } from "aws-amplify"
import { useHistory } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"

const RegisterPage: React.FC = () => {
  const history = useHistory()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const signUp = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    Auth.signUp({
      username: email,
      password: password,
    })
      .then((data) => {
        console.log(data)
        history.push({ pathname: "/verify", state: { username: email } })
      })
      .catch((error) => {
        if (error.code === "UsernameExistsException") {
          history.push("login")
        }
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }
  return (
    <>
    <div className="upper-sign-container" id="container">
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign up</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(_e) => {
              setEmail(_e.target.value)
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(_e) => {
              setPassword(_e.target.value)
            }}
          />
          <a href="/login">Already have a account? Sign in</a>
          <button onClick={signUp}>Sign up</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default RegisterPage
