import React from "react";
import { useState } from "react";
import classNames from "classnames";
import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import Icon from "../Icon";
import { pushBill } from "../../store/modules/billStore";
import { useDispatch } from "react-redux";
import billListData from "../../billTypes";
import "./index.scss";
import dayjs from "dayjs";

const NewNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState("pay");
  const [money, setMoney] = useState(0);
  const [useFor, setUseFor] = useState("");
  const [date, setDate] = useState("");
  const moneyChange = (value) => {
    setMoney(value);
  };

  const saveBill = () => {
    const bill = {
      type: type,
      money: type === "pay" ? -money : +money,
      useFor: useFor,
      date: new Date(),
    };
    console.log(bill);
    dispatch(pushBill(bill));
  };

  return (
    <div className="bookKeeper">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        New Note
      </NavBar>
      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(type === "pay" ? "selected" : "")}
            onClick={() => {
              setType("pay");
            }}
          >
            Payment
          </Button>
          <Button
            shape="rounded"
            className={classNames(type === "income" ? "selected" : "")}
            onClick={() => {
              setType("income");
            }}
          >
            Income
          </Button>
        </div>
      </div>
      <div className="kaFormWrapper">
        <div className="kaForm">
          <div className="date">
            <span className="text">{"Today"}</span>
            <DatePicker className="kaDate" title="Date" max={new Date()} />
          </div>
          <div className="kaInput">
            <Input
              className="input"
              placeholder="$0.00"
              type="number"
              value={money}
              onChange={moneyChange}
            />
          </div>
        </div>
      </div>
      <div className="katTypeList">
        {billListData[type].map((item) => {
          return (
            <div className="katType" key={item.type}>
              <div className="title">
                <h2>{item.name}</h2>
              </div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <Button
                      className={classNames("item", "")}
                      key={item.name}
                      onClick={() => {
                        setUseFor(item.type);
                      }}
                    >
                      {item.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Button className="saveButton primary" type="primary" onClick={saveBill}>
        {" "}
        SaveBill{" "}
      </Button>
    </div>
  );
};
export default NewNote;
