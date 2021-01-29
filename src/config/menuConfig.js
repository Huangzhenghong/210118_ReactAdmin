import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  PieChartOutlined,
  UserOutlined,
  TeamOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined
} from '@ant-design/icons';


const menuList = [
  {
    title: '首页',
    key: '/home',
    icon: < HomeOutlined />
  },
  {
    title: '商品',
    key: 'sub1',
    icon: <AppstoreOutlined />,
    children: [
      {
        title: '品类管理',
        key: '/category',
        icon: <BarsOutlined />,
      },
      {
        title: '商品管理',
        key: '/product',
        icon: <PieChartOutlined />,
      }
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: <UserOutlined />,
  },
  {
    title: '角色管理',
    key: '/role',
    icon: <TeamOutlined />,
  },
  {
    title: '图形图表',
    key: '/sub2',
    icon: <AreaChartOutlined />,
    children: [
      {
        title: '柱形图',
        key: '/bar',
        icon: <BarChartOutlined />,
      },
      {
        title: '折线图',
        key: '/line',
        icon: <LineChartOutlined />,
      },
      {
        title: '饼图',
        key: '/pie',
        icon: <PieChartOutlined />,
      }
    ]
  }
]

export default menuList
    