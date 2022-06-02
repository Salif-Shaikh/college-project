import React, { useState } from "react";
import "../css/login.css";
import { withRouter } from "react-router-dom";
import { BASE_URL, LOGIN } from "../utils/APIUrls";
import { axiosInstance } from "../utils/AxiosInstance";

const Login = props => {
  const [name, setName] = useState("admin");
  const [password, setPassword] = useState("user001");

  const validateForm = () => name.length >= 4 && password.length >= 5;

  const validateLogin = async event => {
    if (
      event.type === "click" ||
      (event.type === "keyup" && [13, 32].includes(event.keyCode))
    ) {
      const { history } = props;
      try {
        const response = await axiosInstance.post(`${BASE_URL}${LOGIN}`, {
          name: name,
          password: password,
        });
        if (
          response &&
          response.status === 200 &&
          response.data &&
          response.data.isValid
        ) {
          history.replace("/main");
        } else {
          console.log("Check your credentials");
        }
      } catch (err) {
        console.log(err);
        console.log("Check your credentials");
      }
    }
  };

  return (
    <div className="ParentDiv">
      <div className="ImgChildDiv"></div>
      <div className="FormChildDiv">
        <div className="LoginForm">
          <form onSubmit={validateLogin} className="InputGroup">
            <h2 className="FormHeading">LOGIN</h2>
            {/* below input for name of the user */}
            <input
              type="text"
              name="name"
              tabIndex="1"
              placeholder="Name"
              className="InputField"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            {/* Below input tag for user Password */}
            <input
              type="password"
              name="password"
              tabIndex="2"
              placeholder="Password"
              className="InputField"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              tabIndex="3"
              disabled={!validateForm()}
              className="LoginBtn"
              onClick={validateLogin}
              onKeyUp={validateLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
