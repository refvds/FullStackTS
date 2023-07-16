import { Layout, Space, Typography } from 'antd';
import { TeamOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CustomButton } from '../custom-button';

import { Paths } from '../../paths';

import styles from './styles.module.css';
import { logout, userSelector } from '../../features/auth/authSlice';

export const Header = () => {
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

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
      {user ? (
        <CustomButton type='ghost' onClick={onLogoutClick} icon={<LoginOutlined />}>
          Logout
        </CustomButton>
      ) : (
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
      )}
    </Layout.Header>
  );
};
