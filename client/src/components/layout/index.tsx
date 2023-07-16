import React from 'react';

import { Layout as AntLayout } from 'antd';

import styles from './styles.module.css';
import { Header } from '../header';

type TProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<TProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />
      <AntLayout.Content style={{ height: '100%' }}>{children}</AntLayout.Content>
    </div>
  );
};
