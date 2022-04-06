import React, { useEffect } from 'react';
import { List, Avatar, Button, Space, Card } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFiles,
  getFilesSelector,
  CreateFolder,
  getFolderSelector,
} from '../../../redux-slices/FileSlice ';

import { Link } from 'react-router-dom';

import './styles.scss';
import Folder from '../../../assets/folder.png';
import Files from '../../../assets/file.png';

import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { getUserToken } from '../../../redux-slices/UserSlice';

const FileList = () => {
  const files = useSelector(getFilesSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiles());
    getUserToken();
  }, []);

  const newFolder = () => {
    dispatch(CreateFolder('new folder'));
  };
  return (
    <>
      <Space
        direction="vertical"
        size="middle"
        style={{ marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }}
      >
        <Card title="" size="small" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="">Загружено: {files.length}</div>
          <div style={{ marginTop: '10px' }}>
            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size="middle"
              onClick={newFolder}
            >
              Новая папка
            </Button>
            <Button type="primary" shape="round" icon={<DownloadOutlined />} size="middle">
              Download
            </Button>
          </div>
        </Card>
      </Space>
      <List>
        <VirtualList data={files} itemHeight={47} itemKey="files">
          {(file) => (
            <List.Item key={file.name}>
              <List.Item.Meta
                avatar={<Avatar src={file.type == 'dir' ? Folder : Files} />}
                title={
                  <Link to={'/'}>
                    {file.type == 'dir' ? file.name : file.name + '.' + file.type}
                  </Link>
                }
                description={file.type == 'dir' ? 'Файлов:' + file.children.length : file.size}
              />
              <Button type="primary" icon={<DeleteOutlined />} shape="circle" size="large"></Button>
            </List.Item>
          )}
        </VirtualList>
      </List>
      ;
    </>
  );
};

export default FileList;
