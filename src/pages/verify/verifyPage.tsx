import { Auth } from "aws-amplify"
import React, { useState, useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import "./verifyPage.css"

interface CustomizedState {
  username: string
}
const VerifyPage: React.FC = () => {
  const [code, setCode] = useState("")
  const location = useLocation()
  const state = location.state as CustomizedState
  const { username } = state
  const history = useHistory()

  useEffect(() => {
    if (!username.length) {
      history.push("login")
    }
  }, [location, history])

  const verify = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log(username)

    Auth.confirmSignUp(username, code)
      .then((data) => {
        console.log(data)
        history.push("home")
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }) 
        console.error(err)
      })
  }
  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(username)
      console.log("code resent successfully")
      toast.success('Code Send Sucessfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    } catch (err) {
      console.log("error resending code: ", err)
    }
    return true
  }

  return (
    <>
    <div className="form-container sign-in-container">
      <form action="#">
        <h1>Verify your account</h1>
        <input
          className="verifyInput"
          type="text"
          placeholder="Enter code here"
          value={code}
          onChange={(_e) => {
            setCode(_e.target.value)
          }}
        />
        <a onClick={resendConfirmationCode}>
          Send another code
        </a>
        <button onClick={verify}>Verify Code</button>
      </form>
    </div>
    <ToastContainer />
    </>
  )
}

export default VerifyPage
