import { DeleteOutlined, DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Modal } from 'antd';
import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Folder from '../../../assets/folder.png';
import Files from '../../../assets/file.png';
import { useDispatch } from 'react-redux';
import { deleteFile, getFile, downloadFile} from '../../../redux-slices/FileSlice ';
import bytesToSize from '../../../utils/SizingCalculate';

interface FileProps {
  currentFile: File | any;
}

const CurrentMesh: FC<FileProps> = (props: any) => {
  const dispatch = useDispatch();
  const { confirm } = Modal;

  const router = useHistory();

  const OpenFile = (folderId) => {
    dispatch(getFile(folderId));
    router.push('/upload');
  };

  const DeleteCurrentFile = (file) => {
    confirm({
      title: (
        <>
          <span> Meш </span>
          <span className="deleteTitle">{file.name}</span>
          <span> будет безвозвратно удален!</span>
        </>
      ),
      icon: <ExclamationCircleOutlined />,
      content: 'Потвердить действие?',
      okText: 'Да',
      okType: 'danger',
      okButtonProps: {
        disabled: false,
      },
      cancelText: 'Нет',
      onOk() {
        dispatch(deleteFile(file._id));
      },
      onCancel() {},
    });
  };

  const DownloadFiles = (event, downloadedFile) => {
    event.stopPropagation()
    console.log("down", downloadedFile);
    
    dispatch(downloadFile(downloadedFile._id, downloadedFile.name))
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
            : bytesToSize(props.currentFile.size)
        }
      />
      <div className="" onClick={(e) => e.stopPropagation()}>
      <Button
          style={{ marginRight: '15px' }}
          onClick={(e) => DownloadFiles(e, props.currentFile)}
          type="primary"
          icon={<DownloadOutlined />}
          shape="circle"
          size="large"
        />
        <Button
          style={{ marginRight: '15px' }}
          onClick={(e) => DeleteCurrentFile(props.currentFile)}
          type="primary"
          icon={<DeleteOutlined />}
          shape="circle"
          size="large"
         />
      </div>
    </List.Item>
  );
};

export default CurrentMesh;
