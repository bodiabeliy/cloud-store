import React, { useEffect } from 'react';
import { getUserToken, isAuthUserSelector } from '../../redux-slices/UserSlice';
import { getFiles } from '../../redux-slices/FileSlice ';

import emptyList from '../../assets/empty.svg';
import banner from '../../assets/banner.png';

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
import { useDispatch, useSelector } from 'react-redux';
import Title from 'antd/lib/typography/Title';

const { Content, Sider } = Layout;

function Dashboard() {
  const dispatch = useDispatch();
  const isAuthorization = useSelector(isAuthUserSelector);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'));
      getUserToken();
    }
  }, []);
  useEffect(() => {
    if (isAuthorization) {
      dispatch(getFiles());
    }
  }, [isAuthorization]);

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
          {isAuthorization == true ? (
            <Content>
              <Empty description="Список файлов и папок пустой" image={emptyList}></Empty>
            </Content>
          ) : (
            <Content>
              <Empty style={{ margin: 0 }} description={''} image={banner}></Empty>
            </Content>
          )}
        </Layout>
      </Layout>
    </>
  );
}

export default Dashboard;
