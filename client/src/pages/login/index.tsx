import { useState } from 'react';

import { Row, Card, Form, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { Layout } from '../../components/layout';
import { CustomInput } from '../../components/custom-input';
import { PasswordInput } from '../../components/password-input/input';
import { CustomButton } from '../../components/custom-button';

import { Paths } from '../../paths';
import { useLoginMutation, TUserData } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utilities/is-error-with-message';
import { ErrorMessage } from '../../components/error-message';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState('');

  const login = async (data: TUserData) => {
    try {
      await loginUser(data).unwrap();
      navigate('/');
    } catch (err) {
      const isError = isErrorWithMessage(err);
      if (isError) {
        setError(err.data.message);
      } else {
        setError('Uknown error');
      }
    }
  };
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card style={{ width: '30rem' }} title='Sign in'>
          <Form onFinish={login}>
            <CustomInput type='email' name='email' placeholder='Email' />
            <PasswordInput name='password' placeholder='Password' />
            <CustomButton type='primary' htmlType='submit'>
              Sing In
            </CustomButton>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              No account? <Link to={Paths.register}>Sign Up</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
