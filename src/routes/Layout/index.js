import {Link, Outlet} from 'react-router-dom';
import {Button} from 'antd-mobile';
import {fetchBillList} from '../../store/modules/billStore';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import { TabBar } from 'antd-mobile';
import {BillOutline, CalculatorOutline, AddCircleOutline} from 'antd-mobile-icons';
import './index.css';
const tabs = [
    {
        key: '/',
        title: 'Monthly Bill',
        icon: <BillOutline />
    },
    {
        key: '/new-bill',
        title: 'Bookkeeping',
        icon: <AddCircleOutline />
    },
    {
        key: '/year',
        title: 'Annual Bill',
        icon: <CalculatorOutline />
    }
];


const Layout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBillList());
    }, [dispatch]);
    const billList = useSelector((state) => state.bill.billList);
    const navigate = useNavigate();
    const switchRouter = (key) => {navigate(key)}
    return (
      <div className='layout'>
        <div className='container'>
        <Outlet />
        </div>
        <div className='footer'>
          <TabBar onChange={switchRouter}>
            {tabs.map(item=>(<TabBar.Item key={item.key} title={item.title} icon={item.icon} />))}
          </TabBar>
        </div>
      </div>
    )
};
export default Layout;