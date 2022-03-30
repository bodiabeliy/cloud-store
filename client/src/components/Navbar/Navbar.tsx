import React, { useCallback, useEffect } from 'react';
import { Layout, Menu, Image } from 'antd';
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
  getUserSelector,
  logoutUserSuccess,
  getUserToken,
} from '../../redux-slices/UserSlice';

const { Header } = Layout;
function Navbar() {
  const dispatch = useDispatch();
  const userLogin = useSelector(getUserSelector);
  const isAuthorization = useSelector(isAuthUserSelector);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getUserToken());
    }
  }, []);

  const logOut = () => {
    dispatch(logoutUserSuccess());
    localStorage.removeItem('token');
  };
  return (
    <>
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
              <NavLink to={'/'} onClick={logOut}>
                Выйти
              </NavLink>
            )}
          </Menu.Item>
          {isAuthorization == false ? (
            <Menu.Item key="2">
              <NavLink to={'/registration'}>Регистрация</NavLink>
            </Menu.Item>
          ) : (
            <NavLink to={'/'}>{userLogin.email.split('@')[0]}</NavLink>
          )}
        </Menu>
      </Header>
    </>
  );
}

export default Navbar;
