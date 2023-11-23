import React from 'react';
import NlHeader from '../NlHeader/NlHeader';
import NlLoadingOverlay from '../NlLoadingOverlay';
import NlPageTitle from '../NlPageTitle';

interface NlListLayoutProps {
  isLoading: boolean;
  title?: string;
}

const NlListLayout: React.FC<NlListLayoutProps> = ({ isLoading, children, title }) => {
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

export default NlListLayout;
