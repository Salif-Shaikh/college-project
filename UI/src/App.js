import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

import "./css/style.scss";

import { focusHandling } from "cruip-js-toolkit";
import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/LoginPage";
import { axiosInstance } from "./utils/AxiosInstance";
import Loader from "./partials/components/loader";

const App = () => {
  const location = useLocation();

  const [startLoading, setStartLoading] = useState(false);

  // useEffect(() => {
  //   document.querySelector("html").style.scrollBehavior = "auto";
  //   window.scroll({ top: 0 });
  //   document.querySelector("html").style.scrollBehavior = "";
  //   focusHandling("outline");
  // }, [location.pathname]); // triggered on route change

  axiosInstance.interceptors.request.use(
    (req) => {
      // console.log(req);
      setStartLoading(true);
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Cookie": this.sessionid,
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      //     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
      // },
      const requestObj = {
        ...req,
        headers: {
          ...req.headers,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
        },
      };
      return requestObj;
      // if (axios.defaults.headers.common["Authorization"]) return req;
      // // eslint-disable-next-line no-throw-literal
      // throw { message: "the token is not available" };
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //on successful response
  axiosInstance.interceptors.response.use(
    (response) => {
      // console.log(response);
      setStartLoading(false);
      return response;
    },
    (error) => {
      const fallbackValue = [
        {
          userId: "Not authorized",
          id: "aerw15311sq",
          title: "Please try again",
          completed: false,
        },
      ];
      return Promise.reject(fallbackValue);
    }
  );

  return (
    <React.Fragment>
      {startLoading && <Loader />}
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/main" component={Dashboard} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
