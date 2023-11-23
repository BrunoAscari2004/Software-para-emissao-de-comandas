import React from 'react';

const NlGridLayout: React.FC = ({ children }) => {
  return <div className="gap-2 grid grid-cols-2-auto">{children}</div>;
};

export default NlGridLayout;
