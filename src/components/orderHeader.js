import "./orderHeader.css";
import { Link } from "react-router-dom";
import Dp from "../images/profilepic.jpg"

const OrderHeader = () => {
  const logout = (e)=>{
    console.log("hi....")
    localStorage.clear();
  }
  return (
    <div className="header">
    <ui className="header-left"> <li className="header-nav"><b>LAUNDRY</b></li></ui>
    <ui className="header-right">
      <li className="light-text header-nav">pricing</li>
      <li className="light-text header-nav">career</li>
      <li className="header-nav li">
        <span><img src={Dp} alt="dp" /></span>
        <span>{localStorage.getItem("name")}</span> 
        <Link to={"/"}>
          <span className="logout">             
            <button onClick={logout}>Log Out</button>
          </span>
        </Link>        
      </li>
    </ui>
  </div>
  );
};
export default OrderHeader;
