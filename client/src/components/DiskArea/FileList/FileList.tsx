import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Button } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, getFilesSelector } from '../../../redux-slices/FileSlice ';
import { Link } from 'react-router-dom';

import './styles.scss';
import Folder from '../../../assets/folder.png';
import Files from '../../../assets/file.png';

import { DeleteOutlined } from '@ant-design/icons';

const FileList = () => {
  const files = useSelector(getFilesSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiles());
  }, []);

  return (
    <>
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
