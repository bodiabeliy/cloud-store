import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

const MeshDetailaze = () => {
  const router = useHistory();
  const backUp = () => {
    router.goBack();
  };

  return (
    <>
      <Navbar></Navbar>
      <Button onClick={backUp}>Назад</Button>
    </>
  );
};

export default MeshDetailaze;
