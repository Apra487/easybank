import { useHistory } from "react-router-dom";

const Intro = () => {
  const history = useHistory();

  const register = () => {
    history.push("login");
  } 
  return (
    <section className="intro">
      <div className="container">
        <div className="intro__content">
          <h1 className="intro__content--headline">
            Next generation digital banking 🚀 
          </h1>

          <p className="intro__content--paragraph large">
            The only bank you will ever need ! Take your finances online with easy bank
          </p>

          {/* <div className="intro__button"> */}
          <button className="request-invite" onClick={register}>Sign In</button>
          {/* </div> */}
        </div>
        <div className="intro__bg-image"></div>
        <img
          className="intro__image"
          src="./images/image-mockups.png"
          alt="mockups"
        />
      </div>
    </section>
  )
}

export default Intro
