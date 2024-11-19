import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";

function App() {
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
