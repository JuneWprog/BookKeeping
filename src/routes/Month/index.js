import { useMemo, useEffect, useState } from "react";
import { NavBar, DatePicker } from "antd-mobile";
import classNames from "classnames";
import "./index.scss";
import dayjs from "dayjs";
import _ from "lodash";
import { useSelector } from "react-redux";
import DayBills from "./components";


const Month = () => {
  const billList = useSelector((state) => state.bill.billList);
  //use lodash to group bills by year and month
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  const [dateVisible, setDateVisible] = useState(false);
  const [monthList, setMonthList] = useState([]);
  // Set initial monthList when the component mounts
  useEffect(() => {
    const initialMonth = dayjs(new Date()).format("YYYY-MM");
    if (monthGroup[initialMonth]) {
      setMonthList(monthGroup[initialMonth]);
    }
  }, [monthGroup]);
  //calculate monthly summary
  const monthSummary = useMemo(() => {
    const payment = monthList
      .filter((item) => item.type === "pay")
      .reduce((acc, cur) => acc + cur.money, 0);
    const income = monthList
      .filter((item) => item.type === "income")
      .reduce((acc, cur) => acc + cur.money, 0);
    return { payment, income, total: payment + income };
  }, [monthList]);
  //control date picker input
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });

  //update monthList and currentDate when user selectes a new date
  const onConfirm = (date) => {
    const formatDate = dayjs(date).format("YYYY-MM");
    setCurrentDate(formatDate);
    setDateVisible(false);
    //formatDate match the monthGroup key
    setMonthList(monthGroup[formatDate] || []);
  };


  //day summary and day bill groups
  const dayGroup = useMemo(() => {
    const dayGroupData =  _.groupBy(monthList, (item) => dayjs(item.date).format("YYYY-MM-DD"));
    const sortedKeys = Object.keys(dayGroupData).sort(); // Sort in ascending order
// For descending order: const sortedKeys = Object.keys(dayGroupData).sort().reverse();

const sortedDayGroupData = [];
sortedKeys.forEach(key => {
  sortedDayGroupData[key] = dayGroupData[key];
});
    return {sortedDayGroupData, sortedKeys};
  }, [monthList]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        Monthly Bill
      </NavBar>
      <div className="content">
        <div className="header">
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentDate + ""}</span>
            {/* control arrow direction  */}
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* statistics */}
          <div className="twoLineOverview">
            {/*monthly bills    monthGroup*/}
            <div className="item">
              <span className="money">{monthSummary.payment.toFixed(2)}</span>
              <span className="type">Payment</span>
            </div>
            <div className="item">
              <span className="money">{monthSummary.income.toFixed(2)}</span>
              <span className="type">Income</span>
            </div>
            <div className="item">
              <span className="money">{monthSummary.total.toFixed(2)}</span>
              <span className="type">Balance</span>
            </div>
          </div>
          {dayGroup.sortedKeys.map((key) => {return <DayBills key = {key} date={key} billList={dayGroup.sortedDayGroupData[key]} />})}
          {/* date picker */}
          <DatePicker
            className="kaDate"
            title="Date"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
      </div>
    </div>
  );
};
export default Month;
