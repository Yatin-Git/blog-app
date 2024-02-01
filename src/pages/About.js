import userContext from "../context/userContext";
import Base from "../components/Base";

const About = () => {
  return (
    <userContext.Consumer>
      {(object) => (
        <Base>
          <h1>Welcome to about page</h1>
          <p>Currently updating blog website</p>
          
          <h1>Welcome user: {object.user.login && object.user.data.name}</h1>
        </Base>
      )}
    </userContext.Consumer>
  );
};

export default About;