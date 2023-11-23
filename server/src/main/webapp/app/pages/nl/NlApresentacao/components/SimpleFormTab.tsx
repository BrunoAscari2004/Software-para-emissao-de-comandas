import { TextField } from '@material-ui/core';
import NlFormSaveButton from '@shared/components/NlButtons/NlFormSaveButton';
import NlGridLayout from '@shared/components/NlGridLayout';
import NlLabel from '@shared/components/NlLabel';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type IDefaultValues = typeof defaultValues; // Nem sempre IDefaultValues vai ser exatamente defaultValues

const defaultValues = {
  codPessoa: 0,
  desPessoa: '',
};

const SimpleFormTab: React.FC = () => {
  // control: Variável que controla os valores do nosso form. Usado dentro do componente Controller
  // handleSubmit: É usado dentro do onSubmit do form que queremos controlar, passando dentro a nossa função de submit.
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  function onSubmit(data: IDefaultValues) {
    console.log('Form submit: ', data);
    toast.success('Veja resultados no console');
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* NLGridLayout - Ira fazer a grid de duas colunas com tamanho automático */}
        <NlGridLayout>
          <NlLabel>codPessoa: </NlLabel>
          <Controller
            control={control} // control = Varivel de controle provinda do useForm() acima.
            name="codPessoa" // name = Nome do campo que queremos manipular.
            render={({ field }) => (
              <TextField
                {...field}
                color="primary"
                variant="filled"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
              // O objeto "field" contém todas as ações necessárias para controlar o input, como "onChange", "value", etc.
              // color: Qual a cor que deve-se ser usada. Valor vem do ThemeProvider no App.tsx
              // variant: Estilo do input
            )}
          />

          <NlLabel>desPessoa: </NlLabel>
          <Controller
            control={control}
            name="desPessoa"
            render={({ field }) => <TextField {...field} color="primary" variant="filled" />}
          />
        </NlGridLayout>

        <div className="absolute right-6 bottom-4">
          {/* O botão abaixo possui um type="submit" */}
          <NlFormSaveButton />
        </div>
      </form>
    </>
  );
};

export default SimpleFormTab;
