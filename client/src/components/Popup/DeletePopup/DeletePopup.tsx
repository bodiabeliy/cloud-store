import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';

const { confirm } = Modal;

function DeletePopup(props) {
  const showConfirm = () => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      okButtonProps: {
        disabled: false,
      },
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <Space wrap>
      <Button onClick={showConfirm} danger type="primary">
        Delete
      </Button>
    </Space>
  );
}

export default DeletePopup;
