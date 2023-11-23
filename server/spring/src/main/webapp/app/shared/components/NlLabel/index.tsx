import React from 'react';

type NlLabelProps = React.HTMLAttributes<HTMLSpanElement>;

const NlLabel: React.FC<NlLabelProps> = ({ children, ...props }) => {
  return (
    <span className="text-right text-gray-500 mt-0.5" {...props}>
      {children}
    </span>
  );
};

export default NlLabel;
