export const monthLookUp = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
}
export const convertMonth = (monthInNumber) => {
  return monthLookUp.months[monthInNumber]
}