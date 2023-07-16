import { Row, Card, Form, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { Layout } from '../../components/layout';
import { CustomInput } from '../../components/custom-input';
import { PasswordInput } from '../../components/password-input/input';
import { CustomButton } from '../../components/custom-button';
import { Paths } from '../../paths';

export const Login: React.FC = () => {
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card style={{ width: '30rem' }} title='Sign in'>
          <Form onFinish={() => null}>
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
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
