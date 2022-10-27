import "./Jumporder.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function List(props) {
  const currToken = localStorage.getItem("token");
  const [change, setchange] = useState(false);
  // const [length, updatedlength] = useState(0);
  const [viewdata, setViewdata] = useState([
    [""],
    [""],
    [""],
    [""],
    [""],
    [""],
    [""],
  ]);
  const [orderid, setOrderid] = useState("");
  const [abcd, setabcd] = useState([""]);
  const [totalcost, uptototalcost] = useState(0);
  const [sub, upsub] = useState(0);
  const [qty, upqty] = useState(0);
  const navigate = useNavigate();
  const cancelorder = (e) => {
    e = e.target;
    let id = e.parentNode.parentNode.children[0].innerText;
    setOrderid(id);
  };
  const view = async (e) => {
    // e = e.target;
    let id,
      i = 0;
    let val = e.target.value;
    if (val == undefined) {
      id = e.target.parentNode.parentNode.parentNode.children[0].innerText;
    } else {
      id = e.target.parentNode.parentNode.children[0].innerText;
    }
    // console.log(val);
    console.log("Id is:", id, "heloooooo....");
    const abc = await axios.get(`http://localhost:8000/orders/${id}`, {
      headers: {
        Authorization: "test " + currToken,
      },
    });
    setViewdata([
      [abc.data.vieworders[0].washtype[0]],
      [abc.data.vieworders[0].washtype[1]],
      [abc.data.vieworders[0].washtype[2]],
      [abc.data.vieworders[0].washtype[3]],
      [abc.data.vieworders[0].washtype[4]],
      [abc.data.vieworders[0].washtype[5]],
      [abc.data.vieworders[0].washtype[6]],
    ]);
    // console.log(abc.data.vieworders[0].washtype[0]);
    console.log(viewdata);
    upsub(abc.data.vieworders[0].subtotalcost);
    uptototalcost(abc.data.vieworders[0].subtotalcost);
    upqty(abc.data.vieworders[0].subtotalcost);
    setabcd([...abc.data.vieworders[0].washtype]);
    console.log(abcd);
    console.log(totalcost, sub);
    console.log(abc.data.vieworders[0]);
  
  };

  const proceed = (e) => {
    window.location.reload(true);
    axios.delete(`http://localhost:8000/orders/${orderid}`, {
      headers: {
        Authorization: "test " + currToken,
      },
    });
    // navigate("/order")
  };
  return (
    <>
      <div className="main-header">
        <div id="order">
          <span>
            <b>orders</b>
          </span>{" "}
          | <b>{props.listData.length}</b>
        </div>
        <div className="search">
          <Link to={"/createorders"}>
            <button type="submit" className="button">
              Create
            </button>
          </Link>
          <i className="fa fa-search" alt="icon" />
          <input type="search" className="input"></input>
        </div>
      </div>
      <table>
        <tr>
          <th style={{ width: "6.8vw" }}>order id</th>
          <th style={{ width: "12.8vw" }}>order date & time</th>
          <th style={{ width: "9.2vw" }}>store location</th>
          <th style={{ width: "9.5vw" }}>city</th>
          <th style={{ width: "11.7vw" }}>store phone</th>
          <th style={{ width: "8.5vw" }}>total items</th>
          <th style={{ width: "7vw" }}>price</th>
          <th style={{ width: "9.5vw" }}>status</th>
          <th style={{ width: "9.02vw" }}></th>
          <th style={{ width: "1.9vw" }}>view</th>
        </tr>
        {props.listData.map((value, key) => {
          return (
            <tr id={value._id}>
              <td>{value._id}</td>
              <td>{value.orderdate}</td>
              <td>Jp Nagar</td>
              <td>{value.storelocation}</td>
              <td>9999999999</td>
              <td>{value.totalquantity}</td>
              <td>{value.totalcost}</td>
              {key % 4 == 0 ? (
                <td>"ready to pick up"</td>
              ) : key % 4 == 1 ? (
                <td>"in washing" </td>
              ) : key % 4 == 2 ? (
                <td>in ironing </td>
              ) : (
                <td>"ready to deliver" </td>
              )}
              {key % 4 === 0 ? (
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal2"
                    onClick={cancelorder}
                  >
                    Cancel order
                  </button>
                </td>
              ) : (
                <td></td>
              )}
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                  onClick={view}
                >
                  <i class="fa fa-eye" alt="view" />
                </button>
              </td>
            </tr>
          );
        })}

        <div className="modal" id="myModal2">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header" style={{ height: "7.5vh" }}>
                <span>Alert</span>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="model2-body">
                <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                <div style={{ display: "inline-block", paddingLeft: "1vw" }}>
                  Are you sure want to cancel the <br></br>Order: {orderid}<br></br>
                </div>
                <div>
                  <Link to={"/order"}>
                    <button
                      type="button"
                      class="btn btn-primary"
                      id="procced-button"
                      data-bs-dismiss="modal"
                      onClick={proceed}
                    >
                      Proceed
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal" id="myModal">
          <div
            class="modal-dialog"
            style={{ margin: " 0 0 0 36vw", maxWidth: "100vw" }}
          >
            <div class="modal-content" style={{ height: "100vh" }}>
              <div class="modal-header">
                <span>Summary</span>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div class="modal-body">
                <div className="store-address">
                  <table>
                    <tr>
                      <th className="sa">store location</th>
                      <th className="sa">store address:</th>
                      <th className="sa">phone</th>
                    </tr>
                    <tr>
                      <td>JP nagar</td>
                      <td>near phone bhoot, 10th road</td>
                      <td>+91 9999999999</td>
                    </tr>
                  </table>
                </div>
                <div className="track"></div>
                <div className="order-details">
                  <div>
                    <b>Order Details</b>
                  </div>
                  <div>
                    <table>
                      {abcd.map((element, index) => {
                        return (
                          <tr className="order-list">
                            <td>{element[0]}</td>
                            <td>{element[1]}</td>
                            <td>
                              <b>
                                {element[2]} x {element[3]}
                              </b>
                            </td>
                            <td className="price">{element[4]}</td>
                          </tr>
                        );
                      })}
                      <tr id="order-list">
                        <td></td> <td></td> <td>sub total:</td>{" "}
                        <td>{totalcost}</td>
                      </tr>
                      <tr id="order-list">
                        <td></td> <td></td> <td>pick up charge</td> <td>90</td>
                      </tr>
                      <tr id="total">
                        <td></td> <td></td>{" "}
                        <td style={{ fontSize: "18px" }}>total:</td>{" "}
                        <td className="total-price">
                          <b>{parseInt(totalcost) + 90} </b>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="address">Address</div>
                  <div className="order-address">
                    <span>
                      {" "}
                      <b>Home</b>{" "}
                    </span>{" "}
                    <br></br>
                    <span> #223, 10th road, Jp Nagar, </span> <br></br>
                    <span> bangalore </span>
                  </div>
                </div>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      </table>
    </>
  );
}
export default List;
