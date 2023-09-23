import { useState } from 'react';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Button, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;


const AdminLayout = () => {
  const location = useLocation()
  const [ collapsed, setCollapsed ] = useState( false );
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='admin-leyout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="admin-logo">Logo</div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[ location.pathname ]}
          items={[
            {
              key: '/dashboard',
              icon: <UserOutlined />,
              label: <Link to='/dashboard'>Dashboart </Link>,
            },
            {
              key: '/teachers',
              icon: <VideoCameraOutlined />,
              label: <Link to='/teachers'>Teachers </Link>,
            },
            {
              key: '/students',
              icon: <UploadOutlined />,
              label: <Link to='/students'>Students </Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed( !collapsed )}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;