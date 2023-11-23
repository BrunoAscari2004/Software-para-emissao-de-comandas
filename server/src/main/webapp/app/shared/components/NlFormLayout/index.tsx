import React from 'react';
import NlHeader from '../NlHeader/NlHeader';
import NlLoadingOverlay from '../NlLoadingOverlay';
import NlPageTitle from '../NlPageTitle';

interface NlFormLayoutProps {
  isLoading: boolean;
  title?: string;
}

const NlFormLayout: React.FC<NlFormLayoutProps> = ({ isLoading, children, title }) => {
  return (
    <>
      <NlHeader />
      <NlLoadingOverlay open={isLoading} />

      <div className="p-5">
        <NlPageTitle>{title}</NlPageTitle>
        {children}
      </div>
    </>
  );
};

export default NlFormLayout;
