import React from 'react';
import NlFormSaveButton from './NlFormSaveButton';
import NlGoBackButton from './NlGoBackButton';
import NlDeleteButton from './NlDeleteButton';

interface NlCrudBarProps {
  onSaveClick?: () => void;
  onDeleteClick?: () => void;
  onGoBackClick?: () => void;
  disableDelete?: boolean;
  disableSave?: boolean;
}

const NlCrudBarFooter: React.FC<NlCrudBarProps> = ({
  disableDelete = false,
  disableSave = false,
  onDeleteClick,
  onSaveClick,
  onGoBackClick,
}) => {
  return (
    <div className="absolute right-7 bottom-5 flex gap-x-2 flex-row-reverse">
      <NlFormSaveButton onClick={onSaveClick} disabled={disableSave} />
      <NlDeleteButton onClick={onDeleteClick} disabled={disableDelete} />
      <NlGoBackButton onClick={onGoBackClick} />
    </div>
  );
};

export default NlCrudBarFooter;
