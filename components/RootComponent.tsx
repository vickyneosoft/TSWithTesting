import React from 'react';

type RootComponentProps = {
  children: React.ReactNode | React.ReactNode[];
};

const RootComponent = (props: RootComponentProps) => {
  const {children} = props;
  return <>{children}</>;
};

export default RootComponent;
