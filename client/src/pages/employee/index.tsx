import { useState } from 'react';

import { Descriptions, Divider, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { userSelector } from '../../features/auth/authSlice';
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees';

import { Layout } from '../../components/layout';
import { CustomButton } from '../../components/custom-button';
import { ErrorMessage } from '../../components/error-message';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utilities/is-error-with-message';

export const EmployeePage = () => {
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const user = useSelector(userSelector);
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [removeEmployee] = useRemoveEmployeeMutation();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!data) {
    return navigate('/');
  }

  const showModal = () => {
    setModalOpen(true);
  };

  const hideModal = () => {
    setModalOpen(false);
  };

  const handleDeleteEmployee = async () => {
    hideModal();

    try {
      await removeEmployee(data.id).unwrap();
      navigate(`${Paths.status}/deleted`);
    } catch (err) {
      const isError = isErrorWithMessage(err);
      if (isError) {
        setError(err.data.message);
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <Layout>
      <Descriptions title="Employee's info" bordered>
        <Descriptions.Item label='Name' span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label='Age' span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label='Address' span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation='left'>Action</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <CustomButton shape='round' type='default' icon={<EditOutlined />}>
                Edit
              </CustomButton>
            </Link>
            <CustomButton shape='round' danger onClick={showModal} icon={<DeleteOutlined />}>
              Delete
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title='Confirm the deletion'
        open={isModalOpen}
        onOk={handleDeleteEmployee}
        onCancel={hideModal}
        okText='Confirm'
        cancelText='Cancel'
      >
        Are you sure you want to delete this employee ?
      </Modal>
    </Layout>
  );
};
