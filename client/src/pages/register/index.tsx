import { Row, Card, Form, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { Layout } from '../../components/layout';
import { CustomInput } from '../../components/custom-input';
import { PasswordInput } from '../../components/password-input/input';
import { CustomButton } from '../../components/custom-button';
import { Paths } from '../../paths';

export const Register: React.FC = () => {
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card style={{ width: '30rem' }} title='Sign up'>
          <Form onFinish={() => null}>
            <CustomInput name='name' placeholder='Name' />
            <CustomInput type='email' name='email' placeholder='Email' />
            <PasswordInput name='password' placeholder='Password' />
            <PasswordInput name='confirmPassword' placeholder='Repeat the password' />
            <CustomButton type='primary' htmlType='submit'>
              Sing Up
            </CustomButton>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              I have already an account <Link to={Paths.login}>Sign In</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
