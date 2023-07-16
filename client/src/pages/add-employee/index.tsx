import { useEffect, useState } from 'react';

import { Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Employee } from '@prisma/client';

import { Layout } from '../../components/layout';
import { EmployeeForm } from '../../components/employee-form';

import { userSelector } from '../../features/auth/authSlice';
import { useAddEmployeeMutation } from '../../app/services/employees';

import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utilities/is-error-with-message';

export const AddEmployee = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();
      navigate(`${Paths.status}/created`);
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
        <EmployeeForm title='Add new employee' btnText='Add' onFinish={handleAddEmployee} error={error} />
      </Row>
    </Layout>
  );
};
