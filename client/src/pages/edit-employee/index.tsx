import { useState } from 'react';

import { Layout, Row } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { Employee } from '@prisma/client';

import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/services/employees';
import { EmployeeForm } from '../../components/employee-form';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utilities/is-error-with-message';

export const EditEmployee = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };
      await editEmployee(editedEmployee).unwrap();
      navigate(`${Paths.status}/updated`);
    } catch (err) {
      const isError = isErrorWithMessage(err);
      if (isError) {
        setError(err.data.message);
      } else {
        setError('Unkown error');
      }
    }
  };

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <EmployeeForm
          title='Edit the employee'
          btnText='Edit'
          error={error}
          employee={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  );
};
