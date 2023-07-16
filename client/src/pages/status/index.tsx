import { Button, Result, Row } from 'antd';
import { Link, useParams } from 'react-router-dom';

const Statuses: Record<string, string> = {
  created: 'Employee has been added successfully',
  updated: 'Employee has been updated successfully',
  deleted: 'Employee has been deleted successfully',
};

export const Status = () => {
  const { status } = useParams();

  return (
    <Row align='middle' justify='center' style={{ width: '100%' }}>
      <Result
        status={status ? 'success' : 404}
        title={status ? Statuses[status] : 'Not found'}
        extra={
          <Button key='dashboard'>
            <Link to='/'>Back to Home</Link>
          </Button>
        }
      />
    </Row>
  );
};
