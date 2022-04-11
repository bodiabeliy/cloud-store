import React, { useEffect } from 'react';
import { getUserToken, isAuthUserSelector } from '../../redux-slices/UserSlice';
import {
  getFile,
  getFiles,
  getFilesSelector,
  getFolderSelector,
} from '../../redux-slices/FileSlice ';

import DiskArea from '../../components/DiskArea/DiskArea';

import { Layout, Menu, Empty, Button } from 'antd';
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
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { url } from 'inspector';
import { useHistory } from 'react-router-dom';

const { Content, Sider } = Layout;

function Dashboard() {
  const dispatch = useDispatch();
  const router = useHistory();

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

  const newFolder = () => {
    router.push('/create-folder');
  };
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
              {files.length ? (
                <DiskArea />
              ) : (
                <Empty description="Список ячеек (меш) пустой!" image={emptyList}>
                  <Button type="primary" className="firstMesh" onClick={newFolder}>
                    Создать первый меш
                  </Button>
                </Empty>
              )}
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
