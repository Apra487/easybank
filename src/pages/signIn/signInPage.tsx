import React, { useState } from "react"
import { Auth } from "aws-amplify"
import { useHistory } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./signinPage.css"

const SignInPage: React.FC = () => {
  const history = useHistory()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const signIn = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    Auth.signIn({
      username: email,
      password: password,
    })
      .then((data) => {
        console.log(data)
        history.push("home")
      })
      .catch((error) => {
        if (error.code === "UserNotConfirmedException") {
          history.push({ pathname: "/verify", state: { username: email } })
        }
        console.log("in error")

        if (error.code === "UserNotFoundException") {
          toast.error("User not found! Try Sign up", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          return;
        }

        if (error.code === "NotAuthorizedException") {
          toast.error("Invalid Password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          return;
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
            <h1>Sign in</h1>
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
            <a href="forget">Forgot your password?</a>
            <a href="/register">Do not have account ? Sign up here</a>
            <button onClick={signIn}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay"></div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}

export default SignInPage
