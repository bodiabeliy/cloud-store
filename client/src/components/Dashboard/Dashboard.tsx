import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserToken } from '../../redux-slices/UserSlice';

import { Layout, Menu, Empty } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import './styles.scss';
import Navbar from '../Navbar/Navbar';

const { Content, Sider } = Layout;

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserToken();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <Menu theme="dark" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="9">Files</Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Content>
            <Empty
              description="Список пуст."
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            ></Empty>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Dashboard;
