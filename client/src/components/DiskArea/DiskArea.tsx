import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFilesSelector } from '../../redux-slices/FileSlice ';
import FileList from '../DiskArea/MeshList/MeshList';
import bytesToSize from '../../utils/SizingCalculate';
import { getUserSelector } from '../../redux-slices/UserSlice';

const DiskArea = () => {
  const user = useSelector(getUserSelector);

  const tabList = [
    {
      key: 'total',
      tab: 'Общий размер',
    },
    {
      key: 'used',
      tab: 'Использовано:',
    },
  ];

  const totalSize = 10737418240;
  const contentList = {
    total: (
      <span>
        Хранилище: <b>{bytesToSize(totalSize)}</b>
      </span>
    ),
    used: <b>{bytesToSize(0)}</b>,
  };
  const [activeTabKey1, setActiveTabKey1] = useState('total');

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  useEffect(() => {
    bytesToSize(totalSize);
  });
  return (
    <>
      <Card
        style={{ marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }}
        title="Информация о диске:"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
      <FileList></FileList>
    </>
  );
};

export default DiskArea;
