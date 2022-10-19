import React, {useContext, useMemo} from 'react';
import {AuthContext} from '../context/AuthContext';

const withAuthContextConsumer = (WrappedComp: React.FC<any>): React.FC<any> => {
  return (props: any) => {
    const contextData = useContext(AuthContext);
    const allProps = useMemo(
      () => ({...props, ...contextData}),
      [contextData, props],
    );
    return <WrappedComp {...allProps} />;
  };
};

export default withAuthContextConsumer;
