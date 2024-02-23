import { useMemo, useState } from "react";
import classNames from "classnames";
import "./index.scss";
import Icon from "../../Icon";

const DayBills = (props) => {
  const {date, billList} = props;
  const daySummary = useMemo(() => {
    const payment = billList
      .filter((item) => item.type === "pay")
      .reduce((acc, cur) => acc + cur.money, 0);
    const income = billList
      .filter((item) => item.type === "income")
      .reduce((acc, cur) => acc + cur.money, 0);
    return { payment, income, total: payment + income };
  }, [billList]);
  //control show or hide bill list
  const [billListVisible, setBillListVisible] = useState(false);
  const onToggleBillList = () => {
    setBillListVisible(!billListVisible);
  }

  return (
    <div className="daySummary" >
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames("arrow", billListVisible && 'expand')} onClick={onToggleBillList}> {">"}</span>
        </div>
        <div className="oneLineOverView">
          <div className="payment">
            <span className="type">Payment</span>
            <span className="money">{daySummary.payment.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">Income</span>
            <span className="money">{daySummary.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="type">Balance</span>
            <span className="money">{daySummary.total.toFixed(2)}</span>
          </div>
        </div>
        {/* day bill list */}
        <div className="billList" style={{display: billListVisible ?'block':'none'}}>
          {billList.map((item, index) => {
            return (
              <div className="bill" key={item.id}>
                <div className='detail'>
                <Icon type={item.useFor}/>
                <div className="billType">{item.useFor}</div>
                </div>
                <div className={classNames('money', item.type)}>
                  {item.money.toFixed(2)}
                </div>
              </div>
            );
          })}
          </div>
      </div>
    </div>
  );
};

export default DayBills;
