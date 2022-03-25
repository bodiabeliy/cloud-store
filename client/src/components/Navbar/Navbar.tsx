import React, { useCallback, useEffect } from 'react';
import { Layout, Menu, Empty } from 'antd';
import { NavLink } from 'react-router-dom';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  isAuthUserSelector,
  authUserSuccess,
  authUserEntry,
  getUserToken,
  getUserSelector,
} from '../../redux-slices/UserSlice';

const { Header, Content, Sider } = Layout;

function Navbar() {
  const dispatch = useDispatch();
  const userLogin = useSelector(getUserSelector);
  const isAuthorization = useSelector(isAuthUserSelector);

  useEffect(() => {
    getUserToken();
  }, []);

  useEffect(() => {
    dispatch(authUserSuccess());
  }, []);

  const Logout = useCallback(() => {
    dispatch(authUserEntry());
  }, []);

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
                {isAuthorization == false ? (
                  <NavLink to={'/login'}>Войти</NavLink>
                ) : (
                  <NavLink to={'/'} onClick={Logout}>
                    Выйти
                  </NavLink>
                )}
              </Menu.Item>
              {isAuthorization == false ? (
                <Menu.Item key="2">
                  <NavLink to={'/registration'}>Регистрация</NavLink>
                </Menu.Item>
              ) : (
                <NavLink to={'/'}>{userLogin.email}</NavLink>
              )}
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
