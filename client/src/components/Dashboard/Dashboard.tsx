import React, { useEffect } from 'react';
import { getUserToken, isAuthUserSelector } from '../../redux-slices/UserSlice';
import { getFiles, getFilesSelector } from '../../redux-slices/FileSlice ';

import DiskArea from '../DiskArea/DiskArea';

import { Layout, Menu, Empty } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import emptyList from '../../assets/empty.svg';
import banner from '../../assets/banner.png';

import './styles.scss';
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';

const { Content, Sider } = Layout;

function Dashboard() {
  const dispatch = useDispatch();
  const isAuthorization = useSelector(isAuthUserSelector);
  const files = useSelector(getFilesSelector);

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
              <div className="files__list" style={{ marginRight: '15px' }}>
                {files.length ? (
                  <DiskArea />
                ) : (
                  <Empty description="Список файлов и папок пустой" image={emptyList}></Empty>
                )}
              </div>
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
