import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Routes/Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import SignIn from "./Routes/SignIn";
import SignUp from "./Routes/SignUp";
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
        <Route path="/signUp">
          <Header />
          <SignUp />
        </Route>
        <Route path="/signIn">
          <Header />
          <SignIn />
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
    </Router>
  );
}

export default App;
