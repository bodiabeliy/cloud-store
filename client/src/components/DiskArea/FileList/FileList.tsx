import React, { useEffect } from 'react';
import { List, Avatar, Button, Space, Card } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFiles,
  getFilesSelector,
  getFolderSelector,
  isFilesLoadingSelector,
} from '../../../redux-slices/FileSlice ';

import { Link, useHistory } from 'react-router-dom';

import './styles.scss';
import Folder from '../../../assets/folder.png';
import Files from '../../../assets/file.png';
import Preloader from '../../Preloader/Preloader';

import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

const FileList = () => {
  const files = useSelector(getFilesSelector);
  const folder = useSelector(getFolderSelector);
  const router = useHistory();
  const preloading = useSelector(isFilesLoadingSelector);
  const dispatch = useDispatch();

  console.log(preloading);

  useEffect(() => {
    dispatch(getFiles());
  }, [folder]);

  const newFolder = () => {
    router.push('/create-folder');
  };
  return (
    <>
      {preloading == true ? (
        <Preloader></Preloader>
      ) : (
        <>
          <Card title="" size="small" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Загружено: {files.length}</div>
            <div className="action-field" style={{ marginTop: '10px' }}>
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
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    shape="circle"
                    size="large"
                  ></Button>
                </List.Item>
              )}
            </VirtualList>
          </List>
        </>
      )}
    </>
  );
};

export default FileList;
