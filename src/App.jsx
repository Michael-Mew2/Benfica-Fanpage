import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./components/Routing/Routing";
import InitialProvider from "./store/InitialContext";
import LatestAndFutureGamesProvider from "./store/LatestAndFutureGamesContext";

function App() {
  return (
    <>
      <InitialProvider>
        <LatestAndFutureGamesProvider>
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
        </LatestAndFutureGamesProvider>
      </InitialProvider>
    </>
  );
}

export default App;
