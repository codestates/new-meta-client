import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./views/Nav/Nav";
import LandingPage from "./views/LandingPage/LandingPage";
import PlayersSearchPage from "./views/PlayersSearchPage/PlayersSearchPage";
import MyPage from "./views/MyPage/MyPage";
import UserPage from "./views/MyPage/UserPage";
import BoardPage from "./views/BoardPage/BoardPage";
import BoardReadPage from "./views/BoardReadPage/BoardReadPage";
import BoardWritePage from "./views/BoardWritePage/BoardWritePage";
import Footer from "./views/Footer/Footer";
import NotFoundPage from "./views/NotFoundPage/NotFoundPage";
import ScrollToTop from "./utils/ScrollToTop";
import Auth from "./utils/Auth";

function App(): ReactElement {
  return (
    <Router>
      <ScrollToTop />
      <Nav />
      <div className="contents">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/players" component={PlayersSearchPage} />
          <Route exact path="/mypage" component={Auth(MyPage, true)} />
          <Route exact path="/userpage" component={UserPage} />
          <Route exact path="/board" component={BoardPage} />
          <Route exact path="/board/read" component={BoardReadPage} />
          <Route
            exact
            path="/board/write"
            component={Auth(BoardWritePage, true)}
          />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
