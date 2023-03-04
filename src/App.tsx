import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Routes/Components/Header";
import Home from "./Routes/Home";
import Popup from "./Routes/Popup";
import Search from "./Routes/Search";
import Start from "./Routes/Start";
import Tv from "./Routes/Tv";

function App() {


  return (
    <Router>
      <Switch>
        <Route path="/search">
          <Header />
          <Search />
        </Route>
        <Route path={["/tv", "/tv/:tvId"]}>
          <Header />
          <Tv />
        </Route>
        <Route path={["/home", "/movies/:movieId"]}>
          <Header />
          <Home />
        </Route>
        <Route path="/">
          <Start />
        </Route>
      </Switch>
      <Popup />
    </Router>
  );
}

export default App;
