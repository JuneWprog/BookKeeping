import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const billStore = createSlice({
    name: 'billStore',
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload;
        },
        addBill(state, action) {
            state.billList.push(action.payload);
        },
        deleteBill(state, action) {
            state.billList = state.billList.filter((bill) => bill.id !== action.payload);
        },
        updateBill(state, action) {
            const index = state.billList.findIndex((bill) => bill.id === action.payload.id);
            state.billList[index] = action.payload;
        }
    }
});

//deconstruct the actions 
const  {setBillList, addBill, deleteBill, updateBill} = billStore.actions;
//async action
const fetchBillList = () => async (dispatch) => {
    const response = await axios.get('http://localhost:3001/bill');
    dispatch(setBillList(response.data));
};

const pushBill = (bill) => async (dispatch) => {
     const res = await axios.post('http://localhost:3001/bill', bill);
    dispatch(addBill(res.data));
};


export {fetchBillList, pushBill, deleteBill, updateBill};
const reducer = billStore.reducer;
export default reducer;