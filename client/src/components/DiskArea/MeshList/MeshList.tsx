import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { List, Avatar, Button, Space, Card, Upload } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFiles,
  getFilesSelector,
  getFolderSelector,
  isFilesLoadingSelector,
  getFile,
  deleteFile,
  uploadFile,
} from '../../../redux-slices/FileSlice ';

import FileInput from '../../Input/inputFile';
import CurrentFile from '../CurrentMesh/CurrentMesh';
import DeleteModal from '../../Popup/DeletePopup/DeletePopup';
import './styles.scss';

import Preloader from '../../Preloader/Preloader';

import { DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';

const MeshList = () => {
  const dispatch = useDispatch();
  const files = useSelector(getFilesSelector);
  const folder = useSelector(getFolderSelector);
  const router = useHistory();
  const preloading = useSelector(isFilesLoadingSelector);

  const newFolder = () => {
    router.push('/create-folder');
  };
  const Uploading = (uploadedFiles) => {
    const files = [...uploadedFiles];
    // console.log([...uploadedFiles]);

    files.forEach((file) => dispatch(uploadFile(file)));
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
              <FileInput multiple type="file" setValue={(event) => Uploading(event)}></FileInput>
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
