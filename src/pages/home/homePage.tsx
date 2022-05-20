import React, { useEffect, useState } from "react"
import { Auth } from "aws-amplify"
import { useHistory } from "react-router-dom"
import "./homepage.css"

const Home = () => {
  const [currentUser, setCurrentUser] = useState("")
  const history = useHistory()
  const signOut = () => {
    Auth.signOut({ global: true })
      .then((data) => {
        history.push("/")
      })
      .catch((err) => {
        console.error(err)
      })
  }
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      setCurrentUser(data.attributes.email)
       
    }).catch((err) => {
      console.error(err)

      history.push("/login")
    })
  }, [])
  return (
    <div className="home">
      <h1>This is a Protected route</h1>
      <h2> Welcome  {currentUser}</h2>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default Home
