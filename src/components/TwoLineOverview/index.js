import classNames from 'classnames'

import './index.scss'

const TwoLineOverview = ({ pay, income }) => {
  return (
    <div className={classNames('twoLineOverview')}>
      <div className="item">
        <span className="money pay">{Math.abs(pay).toFixed(2)}</span>
        <span className="type pay">Payment</span>
      </div>
      <div className="item">
        <span className="money income">{income.toFixed(2)}</span>
        <span className="type income">Income</span>
      </div>
      <div className="item">
        <span className="money balance">{(income + pay).toFixed(2)}</span>
        <span className="type balance">Balance</span>
      </div>
    </div>
  )
}

export default TwoLineOverview
