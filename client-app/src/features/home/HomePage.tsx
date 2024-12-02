import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
  const {
    userStore: { isLoggedIn, user },
    modalStore: { openModal },
  } = useStore();

  const welcomeBack = (
    <>
      <Header
        as="h2"
        inverted
        content={`Welcome to back ${user?.displayName}`}
      />
      <Button as={Link} to={"/activities"} size="huge" inverted>
        Go to Activities!
      </Button>
    </>
  );
  const loginOrRegister = (
    <>
      <Button
        size="huge"
        inverted
        onClick={() => {
          openModal(<LoginForm />);
        }}
      >
        Login
      </Button>
      <Button
        size="huge"
        inverted
        onClick={() => {
          openModal(<RegisterForm />);
        }}
      >
        Register
      </Button>
    </>
  );

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {isLoggedIn ? welcomeBack : loginOrRegister}
      </Container>
    </Segment>
  );
});
