import React, { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";
import Header from "./Header";
import Footer from "./FOOTER/footer";
import Endfooter from "./FOOTER/Endfooter";
import Scheme from "./Scheme";
import Jumporders from "../Jumporders";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [logindata, updatedlogindata] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    const incomingdata = await axios.post(
      "http://localhost:8000/login",
      logindata
    );
    console.log(incomingdata);
    if (incomingdata.data.status == "failed") {
      updatedlogindata({ ...logindata, password: "", userdetails: "" });
      return alert(incomingdata.data.message);
    }
    // console.log(response.data.token)
    <Jumporders incomingdata />;
    localStorage.setItem("token", incomingdata.data.token);
    localStorage.setItem("name", incomingdata.data.data.name);
    navigate("/order");
  };
  return (
    <div>
      <Header />
      <div className="firstpage">
        <div className="firstmaincontent">
          <div className="firstleftmain">
            <div className="firstleftcontent">
              <h2 className="firstheading2">Laundry Service</h2>
              <p className="firstdescription1">
                Doorstep Wash and Drycelan Service
              </p>
              <p className="firsthaveaccount1">Dont Have An Account?</p>
              <Link to="/register">
                <button className="firstregister-button">Register</button>
              </Link>
            </div>
          </div>
          <div className="firstrightmain">
            <div className="firstrightcontent">
              <h2 className="firstheading3">SIGN IN</h2>
              <form className="loginform" onSubmit={handlesubmit}>
                <label className="firstemail">Email/Mobile</label>
                <br />
                <input
                  name="userdetails"
                  required
                  value={logindata.userdetails}
                  onChange={(e) =>
                    updatedlogindata({
                      ...logindata,
                      userdetails: e.target.value,
                    })
                  }
                />
                <p
                  style={{
                    color: "red",
                    margin: "-22px",
                    fontSize: "12px",
                    marginLeft: "220px",
                  }}
                >
                  {/* {incomingdata.data.messageuser} */}
                </p>
                <br />
                <label className="firstpassword">Password</label>
                <br />
                <input
                  type="password"
                  name="password"
                  required
                  value={logindata.password}
                  onChange={(e) =>
                    updatedlogindata({ ...logindata, password: e.target.value })
                  }
                />
                <p
                  style={{
                    color: "red",
                    margin: "-22px",
                    fontSize: "12px",
                    marginLeft: "220px",
                  }}
                >
                  {/* {incomingdata.data.messagepass} */}
                </p>
                <br />
                <span className="firstforget">Forget Password?</span>
                <br />
                <button
                  type="submit"
                  value="Login"
                  className="firstsigninbutton"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
        <Scheme />
        <Footer />
        <Endfooter />
      </div>
    </div>
  );
};
export default Login;
