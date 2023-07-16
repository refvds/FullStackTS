import { useEffect } from 'react';

import { Employee } from '@prisma/client';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetAllEmployeesQuery } from '../../app/services/employees';

import { CustomButton } from '../../components/custom-button';
import { Layout } from '../../components/layout';
import { Paths } from '../../paths';
import { userSelector } from '../../features/auth/authSlice';

const columns: ColumnsType<Employee> = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

export const Employees: React.FC = () => {
  const { data, isLoading } = useGetAllEmployeesQuery();
  const user = useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const goToAddEmployee = () => navigate(Paths.employeeAdd);

  return (
    <Layout>
      <CustomButton type='primary' onClick={goToAddEmployee} icon={<PlusCircleOutlined />}>
        Add
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return { onClick: () => navigate(`${Paths.employee}/${record.id}`) };
        }}
      />
    </Layout>
  );
};
