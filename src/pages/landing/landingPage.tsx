import React, { Dispatch, SetStateAction, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Auth } from "aws-amplify";
import { Header, Intro, Easybank, Articles, Footer } from "../../components"

const LandingPage: React.FC = () => {
  const history = useHistory()

  
  
  useEffect(() => {
    Auth.currentAuthenticatedUser().then(() => {
      history.push("home")
    }).catch(() => {
      console.log('no current user !');
    })
  }, [])
  return (
    <div className="wrapper">
      <Header />
      <Intro />
      <Easybank />
      <Articles />
      <Footer />
    </div>
  )
}

export default LandingPage
