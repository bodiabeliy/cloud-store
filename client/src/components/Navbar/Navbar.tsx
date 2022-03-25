import React from 'react';
import { Layout, Menu, Empty, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

function Navbar() {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <Menu theme="dark" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="9">Files</Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="header">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ display: 'flex', flexDirection: 'row-reverse' }}
            >
              <Menu.Item key="1">
                <NavLink to={'/login'}>Войти</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to={'/registration'}>Регистрация</NavLink>
              </Menu.Item>
            </Menu>
          </Header>
          <Content>
            <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"></Empty>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Navbar;
