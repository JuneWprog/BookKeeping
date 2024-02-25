import { TabBar } from 'antd-mobile'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from 'antd-mobile-icons'
import './index.scss'

const tabs = [
  {
    key: '/',
    title: 'Monthly Bill',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: 'New Bill',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: 'Yearly Bill',
    icon: <CalculatorOutline />,
  },
]

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="kaLayout">
      <div className="page">
        {/* Secondary routes */}
        <Outlet />
      </div>

      <TabBar
        className="tabbar"
        activeKey={location.pathname}
        onChange={key => navigate(key)}
      >
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
