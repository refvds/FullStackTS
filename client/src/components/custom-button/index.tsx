import { Button, Form } from 'antd';

type TProps = {
  children: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
  danger?: boolean;
  loading?: boolean;
  shape?: 'default' | 'circle' | 'round' | undefined;
  icon?: React.ReactNode;
};

export const CustomButton: React.FC<TProps> = ({
  children,
  htmlType = 'button',
  onClick,
  danger,
  type,
  loading,
  shape,
  icon,
}) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        onClick={onClick}
        icon={icon}
      >
        {children}
      </Button>
    </Form.Item>
  );
};
