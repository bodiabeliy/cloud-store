import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uploadFile } from '../../../redux-slices/FileSlice ';
import Navbar from '../../Navbar/Navbar';

const MeshDetailaze = () => {
  const router = useHistory();
  const dispatch = useDispatch();
  const backUp = () => {
    router.goBack();
  };

  const Uploading = (e) => {
    console.log(e);

    dispatch(uploadFile(e.file));
  };

  return (
    <>
      <Navbar></Navbar>
      <Button onClick={backUp}>Назад</Button>
      <Upload multiple={true} onChange={(e) => Uploading(e)}>
        <Button icon={<UploadOutlined />}>Загрузить файлы</Button>
      </Upload>
    </>
  );
};

export default MeshDetailaze;
