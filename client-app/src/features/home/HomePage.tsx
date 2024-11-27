import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function HomePage() {
  const {
    userStore: { isLoggedIn },
  } = useStore();
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
        </Header>
        {isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome to Reactivities" />
          </>
        ) : null}
        <Button
          as={Link}
          to={isLoggedIn ? "/activities" : "/login"}
          size="huge"
          inverted
        >
          {isLoggedIn ? "Go to Activities" : "Login"}!
        </Button>
      </Container>
    </Segment>
  );
});
