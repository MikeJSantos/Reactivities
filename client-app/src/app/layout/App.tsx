import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";

function App() {
  const {
    commonStore: { appLoaded, token, setAppLoaded },
    userStore: { getUser },
  } = useStore();
  useEffect(() => {
    if (token) getUser().finally(() => setAppLoaded());
    else setAppLoaded();
  }, [token, setAppLoaded, getUser]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;

  let child =
    useLocation().pathname === "/" ? (
      <HomePage />
    ) : (
      <>
        <NavBar />
        <Container style={{ marginTop: "7em" }}>
          <Outlet />
        </Container>
      </>
    );

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {child}
    </>
  );
}

export default observer(App);
