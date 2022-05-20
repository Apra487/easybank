import { Auth } from "aws-amplify"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"

const ForgetPasswordPage: React.FC = () => {
  const [code, setCode] = useState("")
  const [userPresent, setUserPresent] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  // const [userName, setUserName] = useState("")

  const [email, setEmail] = useState("")
  const history = useHistory()

  const verifyEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    Auth.forgotPassword(email)
      .then((data) => {
        console.log(data)
        setUserPresent(true)
        toast.success("Code send successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }); 
      })
  }

  const createNewPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    Auth.forgotPasswordSubmit(email, code, newPassword)
      .then((data) => {
        history.push("home")
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        console.log(err)
      })
  }

  return (
    <>
      <div className="upper-sign-container" id="container">
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Reset Password</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(_e) => {
                setEmail(_e.target.value)
              }}
            />
            {userPresent && (
              <>
                <input
                  type="text"
                  placeholder="Verification Code"
                  value={code}
                  onChange={(_e) => {
                    setCode(_e.target.value)
                  }}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(_e) => {
                    setNewPassword(_e.target.value)
                  }}
                />
              </>
            )}
            {userPresent ? (
              <button onClick={createNewPassword}>
                Verify and create new password
              </button>
            ) : (
              <button onClick={verifyEmail}>Send Code</button>
            )}
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

export default ForgetPasswordPage
