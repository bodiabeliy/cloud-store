import React, { FC } from 'react';
import { Input } from 'antd';

interface InputProps {
  placeholder: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputField: FC<InputProps> = (props: any) => {
  return (
    <Input
      onChange={(event: any) => props.setValue(event.target.value)}
      value={props.value}
      placeholder={props.placeholder}
      type={props.type}
    />
  );
};

export default InputField;
