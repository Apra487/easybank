import { Amplify } from "aws-amplify"
import awsExports from "./aws-exports"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LandingPage from "./pages/landing/landingPage"
import RegisterPage from "./pages/register/registerPage"
import SignInPage from "./pages/signIn/signInPage"
import HomePage from "./pages/home/homePage"
import VerifyPage from "./pages/verify/verifyPage"
import ForgetPasswordPage from "./pages/forgetPassword/forgetPasswordPage"

Amplify.configure(awsExports)

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <SignInPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/verify">
          <VerifyPage />
        </Route>
        <Route path="/forget">
          <ForgetPasswordPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
