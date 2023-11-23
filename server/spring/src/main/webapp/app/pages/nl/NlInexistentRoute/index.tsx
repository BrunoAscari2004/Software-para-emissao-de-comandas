import React from 'react';
import NlHeader from '@shared/components/NlHeader/NlHeader';

const NlInexistentRoute: React.FC = () => {
  return (
    <>
      <NlHeader />

      <div className="flex w-full items-center pt-5 flex-col">
        <div className="flex mb-3 px-5 py-2 items-center justify-center bg-red-600 rounded-md">
          <h1 className="text-white">404</h1>
        </div>
        <h1>A página que você esta tentando acessar não existe</h1>
      </div>
    </>
  );
};

export default NlInexistentRoute;
