import { createSlice } from '@reduxjs/toolkit'
import http from '../../utils/http'


const kaSlice = createSlice({
  name: 'ka',
  initialState: {
    // 2023: [{ type, date, money, useFor }]
    //  type: 'pay' | 'income'
    // 2024: [{ type, date, money, useFor }]
    billList: [],
  },
  reducers: {
    setBillList (state, action) {
      state.billList = action.payload
    },
    addBill (state, action) {
      state.billList.push(action.payload)
    }
  }
})

// create a new bill
const { addBill } = kaSlice.actions
const createBill = (data) => {
  //validate data
 return async (dispatch) => {
    const res = await http.post('/ka', data)
    dispatch(addBill(res.data))
  }}

// get bills from server
const { setBillList } = kaSlice.actions
const getBills = () => {
  return async (dispatch) => {
    const res = await http.get('/ka')
    dispatch(setBillList(res.data))
  }
}
export default kaSlice.reducer

export {
  createBill,
  getBills
}
