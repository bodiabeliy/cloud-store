import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, Button, List } from 'antd';
import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Folder from '../../../assets/folder.png';
import Files from '../../../assets/file.png';
import { useDispatch } from 'react-redux';
import { deleteFile, getFile } from '../../../redux-slices/FileSlice ';

interface FileProps {
  currentFile: File | any;
}

const CurrentMesh: FC<FileProps> = (props: any) => {
  const dispatch = useDispatch();
  const router = useHistory();

  const OpenFile = (folderId) => {
    dispatch(getFile(folderId));
    router.push('/folder');
  };

  const deleteCurrentFile = (folderId) => {
    console.log(folderId);

    dispatch(deleteFile(folderId));
  };

  return (
    <List.Item
      key={props.currentFile.name}
      onClick={() => {
        OpenFile(props.currentFile._id);
      }}
    >
      <List.Item.Meta
        avatar={<Avatar src={props.currentFile.type == 'dir' ? Folder : Files} />}
        title={
          <Link to={'/'}>
            {props.currentFile.type == 'dir'
              ? props.currentFile.name
              : props.currentFile.name + '.' + props.currentFile.type}
          </Link>
        }
        description={
          props.currentFile.type == 'dir'
            ? 'Файлов:' + props.currentFile.children.length
            : props.currentFile.size
        }
      />
      <Button
        onClick={() => deleteCurrentFile(props.currentFile._id)}
        type="primary"
        icon={<DeleteOutlined />}
        shape="circle"
        size="large"
      ></Button>
    </List.Item>
  );
};

export default CurrentMesh;
