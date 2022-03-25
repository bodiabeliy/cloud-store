import React, { useEffect, useCallback, useState } from 'react';
import { getUserSelector, registerUser } from '../../redux-slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

import './index.scss';
import { Modal, Form } from 'antd';
import InputField from '../Input/input';
import RegistryBtn from '../Button/Button';

function Popup() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Modal title="Регистрация" visible={true}>
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
        <RegistryBtn
          type="primary"
          description="Зарегистрировать"
          submitForm={() => registerUser(email, password)}
        />
      </Modal>
    </>
  );
}

export default Popup;
