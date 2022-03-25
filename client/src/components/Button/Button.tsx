import * as React from 'react';
import { Button } from 'antd';
import { FC } from 'react';

interface ButtonProps {
  type: string;
  description: string;
  submitForm: any;
}

const ButtonField: FC<ButtonProps> = (props: any) => {
  return (
    <Button onClick={props.submitForm} type={props.type}>
      {props.description}
    </Button>
  );
};

export default ButtonField;
