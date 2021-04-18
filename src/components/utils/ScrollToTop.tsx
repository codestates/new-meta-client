import { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default withRouter(ScrollToTop);
