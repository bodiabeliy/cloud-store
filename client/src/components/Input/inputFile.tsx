import React, { FC } from 'react';
import { Input } from 'antd';
import './index.scss';
import { CloudUploadOutlined } from '@ant-design/icons';
interface InputProps {
  type: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  multiple: boolean;
  description: string;
}

const InputFile: FC<InputProps> = (props: any) => {
  return (
    <>
      <label className="fileUpload__label ant-btn-primary ant-btn-round" htmlFor="fileUpload">
        <CloudUploadOutlined />
        {props.description}
      </label>
      <Input
        className="fileUpload__input"
        id="fileUpload"
        onChange={(event: any) => props.setValue(event.target.files)}
        type={props.type}
        multiple={true}
      />
    </>
  );
};

export default InputFile;
