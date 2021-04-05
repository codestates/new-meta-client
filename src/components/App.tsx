import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./views/Nav/Nav";
import LandingPage from "./views/LandingPage/LandingPage";
import PlayersSearchPage from "./views/PlayersSearchPage/PlayersSearchPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import MyPage from "./views/MyPage/MyPage";
import BoardPage from "./views/BoardPage/BoardPage";
import BoardReadPage from "./views/BoardReadPage/BoardReadPage";
import BoardWritePage from "./views/BoardWritePage/BoardWritePage";
import Footer from "./views/Footer/Footer";

function App(): ReactElement {
  return (
    <Router>
      <Nav />
      <div className="contents">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/players">
            <PlayersSearchPage />
          </Route>

          <Route exact path="/login">
            <LoginPage />
          </Route>

          <Route exact path="/register">
            <RegisterPage />
          </Route>

          <Route exact path="/mypage">
            <MyPage />
          </Route>

          <Route exact path="/board">
            <BoardPage />
          </Route>

          <Route exact path="/board/read">
            <BoardReadPage />
          </Route>

          <Route exact path="/board/write">
            <BoardWritePage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
