import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { isAuthUserSelector } from '../../../redux-slices/UserSlice';

const MeshList = () => {
  const dispatch = useDispatch();
  const files = useSelector(getFilesSelector);
  const isAuthorization = useSelector(isAuthUserSelector);
  const router = useHistory();
  const preloading = useSelector(isFilesLoadingSelector);

  const [dragEnter, setDragEnter] = useState(false)

  useEffect(() => {});

  const newFolder = () => {
    router.push('/create-folder');
  };

  const UploadFiles = useCallback(
    (uploadedFiles) => {
      const files = [...uploadedFiles];
      // console.log([...uploadedFiles]);

      files.forEach((file) => dispatch(uploadFile(file)));
    },
    [isAuthorization]
  );

  const dragEnterHandler =(event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }

  const dragLeaveHandler =(event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }

  const dragOverHandler =(event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }

  const dropHandler =(event) => {
    event.preventDefault()
    event.stopPropagation()
    let uploadedFiles = [...event.dataTransfer.files]
    uploadedFiles.forEach((file) => dispatch(uploadFile(file)));
    
    setDragEnter(false)
  }

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
                Создать
              </Button>
              <FileInput
                description="Загрузить"
                multiple
                type="file"
                setValue={(event) => UploadFiles(event)}
              ></FileInput>
            </div>
          </Card>
          {dragEnter ?
           <div className="meshList__droppingContainer"
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragEnter={(e) => dragEnterHandler(e)}
              onDrop={(e) => dropHandler(e)}
           >
            <span>Drag file there</span>
           </div> 
           :
           <div 
            onDragEnter={(e) => dragEnterHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}>
            <List>
            <VirtualList data={files} itemHeight={47} itemKey="files">
              {(file) => <CurrentFile currentFile={file}></CurrentFile>}
            </VirtualList>
          </List>
           </div>
          }
        </>
      )}
    </>
  );
};
export default MeshList;
