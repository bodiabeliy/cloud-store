import React, { FC } from 'react';
import { Input } from 'antd';

interface InputProps {
  type: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  multiple: boolean;
}

const InputFile: FC<InputProps> = (props: any) => {
  return (
    <Input
      onChange={(event: any) => props.setValue(event.target.files)}
      type={props.type}
      multiple={true}
    />
  );
};

export default InputFile;
