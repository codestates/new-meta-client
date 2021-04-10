import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./views/Nav/Nav";
import LandingPage from "./views/LandingPage/LandingPage";
import PlayersSearchPage from "./views/PlayersSearchPage/PlayersSearchPage";
import LoginPage from "./views/LoginPage/LoginPage";
import MyPage from "./views/MyPage/MyPage";
import BoardPage from "./views/BoardPage/BoardPage";
import BoardReadPage from "./views/BoardReadPage/BoardReadPage";
import BoardWritePage from "./views/BoardWritePage/BoardWritePage";
import Footer from "./views/Footer/Footer";
import Loading from "./utils/Loading";

function App(): ReactElement {
  return (
    <Router>
      <Nav />
      <div className="contents">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/players" component={PlayersSearchPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/board" component={BoardPage} />
          <Route exact path="/board/read" component={BoardReadPage} />
          <Route exact path="/board/write" component={BoardWritePage} />
          <Route exact path="/loading" component={Loading} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
