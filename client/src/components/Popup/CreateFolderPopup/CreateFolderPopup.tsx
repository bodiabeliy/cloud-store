import React, { useCallback, useState } from 'react';
import { createFiles, getFolderSelector } from '../../../redux-slices/FileSlice ';
import { useHistory } from 'react-router-dom';

import '../index.scss';
import { Modal, Form } from 'antd';
import InputField from '../../Input/input';
import RegistryBtn from '../../Button/Button';
import { useDispatch, useSelector } from 'react-redux';

function CreateFolderPopup() {
  const dispatch = useDispatch();
  const route = useHistory();

  const folder = useSelector(getFolderSelector);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [folderName, setFolderName] = useState('');

  const handleCancel = () => {
    setIsModalVisible(false);
    route.push('/');
  };

  const CreateFolder = () => {
    dispatch(createFiles(folder._id, folderName));
    setIsModalVisible(false);
    route.push('/');
  };
  return (
    <>
      <Modal title="Новая папка" visible={isModalVisible} onCancel={handleCancel}>
        <Form.Item
          label="Название:"
          name="folderName"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, напишите название папки!',
            },
          ]}
        >
          <InputField
            value={folderName}
            setValue={setFolderName}
            type="text"
            placeholder="Название..."
          />
        </Form.Item>
        <RegistryBtn type="primary" description="Создать" submitForm={CreateFolder} />
      </Modal>
    </>
  );
}

export default CreateFolderPopup;
