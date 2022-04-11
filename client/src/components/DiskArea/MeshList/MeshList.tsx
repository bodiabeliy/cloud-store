import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { List, Avatar, Button, Space, Card } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFiles,
  getFilesSelector,
  getFolderSelector,
  isFilesLoadingSelector,
  getFile,
  deleteFile,
} from '../../../redux-slices/FileSlice ';

import CurrentFile from '../CurrentMesh/CurrentMesh';
import DeleteModal from '../../Popup/DeletePopup/DeletePopup';
import './styles.scss';

import Preloader from '../../Preloader/Preloader';

import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

const MeshList = () => {
  const files = useSelector(getFilesSelector);
  const folder = useSelector(getFolderSelector);
  const router = useHistory();
  const preloading = useSelector(isFilesLoadingSelector);

  const newFolder = () => {
    router.push('/create-folder');
  };
  return (
    <>
      {preloading == true ? (
        ''
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
                Создать меш
              </Button>
              <Button type="primary" shape="round" icon={<DownloadOutlined />} size="middle">
                Скачать
              </Button>
            </div>
          </Card>
          <List>
            <VirtualList data={files} itemHeight={47} itemKey="files">
              {(file) => <CurrentFile currentFile={file}></CurrentFile>}
            </VirtualList>
          </List>
        </>
      )}
    </>
  );
};

export default MeshList;
