import React, { useCallback, useState } from 'react';
import { Login } from '../../../redux-slices/UserSlice';
import { useHistory } from 'react-router-dom';

import '../index.scss';
import { Modal, Form } from 'antd';
import InputField from '../../Input/input';
import RegistryBtn from '../../Button/Button';
import { useDispatch } from 'react-redux';

function AuthPopup() {
  const dispatch = useDispatch();

  const route = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCancel = () => {
    setIsModalVisible(false);
    route.push('/');
  };

  const logIn = useCallback(() => {
    dispatch(Login(email, password));
    setIsModalVisible(false);
    route.push('/');
  }, [dispatch, email, password]);
  return (
    <>
      <Modal title="Авторизация" visible={isModalVisible} onCancel={handleCancel}>
        <Form.Item
          label="Имя пользователя (логин):"
          name="email"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите логин пользователя!',
            },
          ]}
        >
          <InputField
            value={email}
            setValue={setEmail}
            type="text"
            placeholder="Введите имя пользователя"
          />
        </Form.Item>
        <Form.Item
          label="Пароль:"
          name="password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите пароль пользователя!',
            },
          ]}
        >
          <InputField
            value={password}
            setValue={setPassword}
            type="password"
            placeholder="Введите пароль пользователя"
          />
        </Form.Item>
        <RegistryBtn type="primary" description="Авторизация" submitForm={logIn} />
      </Modal>
    </>
  );
}

export default AuthPopup;
