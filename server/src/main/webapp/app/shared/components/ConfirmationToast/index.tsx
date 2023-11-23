import { Button } from '@mui/material';
import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

interface IButtonLabelOptions {
  btn1Desc?: string;
  btn2Desc?: string;
}

export const confirmationToast = async (msg: ReactNode, options?: IButtonLabelOptions) => {
  try {
    await new Promise((resolve, reject) => {
      toast(
        t => (
          <ConfirmationToast
            msg={msg}
            options={options}
            id={t.id}
            onSuccess={() => {
              toast.dismiss(t.id);
              resolve(undefined);
            }}
            onCancel={() => {
              toast.dismiss(t.id);
              reject(new Error('Cancelar'));
            }}
          />
        ),
        { duration: 1000000 },
      );
    });
    return true;
  } catch (e) {
    return false;
  }
};

interface IConfirmationToast {
  msg: ReactNode;
  id?: string;
  options?: IButtonLabelOptions;
  onSuccess: () => any;
  onCancel: () => any;
}

const ConfirmationToast: React.FC<IConfirmationToast> = ({ msg, onCancel, onSuccess, options }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const toastEventListener = useCallback((event: KeyboardEvent) => {
    const actions: Record<(typeof event)['key'], () => any> = {
      Escape: onCancel,
      Enter: onSuccess,
    };

    if (event.key in actions) {
      event.preventDefault();
      actions[event.key]();
      document.removeEventListener('keydown', toastEventListener);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', toastEventListener);
  }, []);

  return (
    <div className="flex w-full flex-col gap-2">
      {msg}
      <div className="flex w-full justify-end gap-2">
        <Button onClick={onCancel}>{options?.btn2Desc ?? 'Cancelar'} </Button>
        <Button variant="contained" onClick={onSuccess} ref={ref} tabIndex={1}>
          {options?.btn1Desc ?? 'Ok'}
        </Button>
      </div>
    </div>
  );
};
