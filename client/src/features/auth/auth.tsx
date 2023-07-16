import { useCurrentQuery } from '../../app/services/auth';
type TProps = {
  children: JSX.Element;
};
export const Auth: React.FC<TProps> = ({ children }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return children;
};
