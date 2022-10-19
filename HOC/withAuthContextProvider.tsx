import React from 'react';
import AuthContextComponent from '../context/AuthContext';

const withAuthContextProvider = (WrappedComp: React.FC<any>): React.FC<any> => {
  return (props: any) => {
    return (
      <AuthContextComponent>
        <WrappedComp {...props} />
      </AuthContextComponent>
    );
  };
};

export default withAuthContextProvider;
