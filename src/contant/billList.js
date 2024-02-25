import dayjs from 'dayjs'

export const billListData = {
  pay: [
    {
      type: 'foods',
      name: 'Food & Drink',
      list: [
        { type: 'food', name: 'Groceries' },
        { type: 'drinks', name: 'Drinks' },
        { type: 'dessert', name: 'Dessert & Snack' },
      ],
    },
    {
      type: 'taxi',
      name: 'Transport',
      list: [
        { type: 'taxi', name: 'Taxi' },
        { type: 'longdistance', name: 'Traveling' },
      ],
    },
    {
      type: 'recreation',
      name: 'Entertainment',
      list: [
        { type: 'bodybuilding', name: 'Sports' },
        { type: 'game', name: 'Game' },
        { type: 'audio', name: 'Movie' },
        { type: 'travel', name: 'Vacation' },
      ],
    },
    {
      type: 'daily',
      name: 'Daily Necessities',
      list: [
        { type: 'clothes', name: 'Clothing' },
        { type: 'bag', name: 'Accessories' },
        { type: 'book', name: 'Books' },
        { type: 'promote', name: 'Learning' },
        { type: 'home', name: 'Demestic Bills' },
      ],
    },
    {
      type: 'other',
      name: 'Others',
      list: [{ type: 'community', name: 'Community' }],
    },
  ],
  income: [
    {
      type: 'professional',
      name: 'Other Income',
      list: [
        { type: 'salary', name: 'Salary' },
        { type: 'overtimepay', name: 'Overtime' },
        { type: 'bonus', name: 'Bonus' },
      ],
    },
    {
      type: 'other',
      name: 'Other Income',
      list: [
        { type: 'financial', name: 'Investment' },
        { type: 'cashgift', name: 'Gift' },
      ],
    },
  ],
}

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
  billListData[key].forEach(bill => {
    bill.list.forEach(item => {
      prev[item.type] = item.name
    })
  })
  return prev
}, {})

export const getOverview = (data = []) => {
  return data.reduce(
    (prev, item) => {
      return {
        ...prev,
        date: item.date,
        [item.type]: prev[item.type] + +item.money,
      }
    },
    { pay: 0, income: 0, date: null }
  )
}

export const getMonthOverview = (data, month) => {
  // 
  const bill = data.filter(item => {
    return month === dayjs(item.date).get('month')
  })
  return getOverview(bill)
}
