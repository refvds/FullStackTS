import { Layout, Space, Typography } from 'antd';
import { TeamOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { CustomButton } from '../custom-button';

import { Paths } from '../../paths';

import styles from './styles.module.css';

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type='ghost'>
            <Typography.Title level={1}>Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.register}>
          <CustomButton type='ghost' icon={<UserOutlined />}>
            Sign Up
          </CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton type='ghost' icon={<LoginOutlined />}>
            Sign In
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};
