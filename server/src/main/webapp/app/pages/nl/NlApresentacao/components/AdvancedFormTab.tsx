import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import NlFormSaveButton from '@shared/components/NlButtons/NlFormSaveButton';
import NlGridLayout from '@shared/components/NlGridLayout';
import NlLabel from '@shared/components/NlLabel';
import Lov from '@shared/components/NlLov';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type IDefaultValues = {
  codCaixa: number;
  tipUnidade: typeof itemsTipUnidades[0];
  codUfFk: any; // Pegar tipagem da pasta @types dentro de /shared
};

// Possíveis valores para a CK. Comparável ao getItemsTipUnidades(); do backing no trinidad.
const itemsTipUnidades = [
  { id: 1, label: 'Unidade 1' },
  { id: 2, label: 'Unidade 2' },
  { id: 3, label: 'Unidade 3' },
  { id: 4, label: 'Unidade 4' },
];

const defaultValues = {
  codCaixa: 0,
  tipUnidade: { id: 1, label: 'Unidade 1' }, // defaultValues de Autocomplete = Objeto inteiro | null
  codUfFk: null,
};

const AdvancedFormTab: React.FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (data: IDefaultValues) => {
    console.log('Form submit: ', data);
    toast.success('Veja resultados no console');
  };

  // Os dados da lov devem ser carregados usando a propriedade 'getData' no componente.
  // Esta função deve retornar um vetor com os dados que devem ser mostrados na tela.
  const getLovCodUfData = async () => {
    // Chamada a uma API
    const response = await axios.get('https://covid-api.mmediagroup.fr/v1/cases?country=Brazil');

    // Resultado é tratado. Neste exemplo esta retornando um Array<{ codUf: number, desUf: string }>
    return Object.entries(response.data)
      .filter(country => country[0] !== 'All')
      .map((ufName: any, index) => ({
        codUf: index,
        desUf: ufName[0],
      }));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <NlGridLayout>
          <NlLabel>Código: </NlLabel>
          <Controller
            control={control}
            name="codCaixa"
            render={({ field }) => (
              <TextField
                {...field}
                color="primary"
                variant="filled"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
            )}
          />

          <NlLabel>Unidade: </NlLabel>
          <Controller
            control={control}
            name="tipUnidade"
            render={({ field }) => (
              <Autocomplete
                {...field}
                onChange={(e, newValue) => {
                  field.onChange(newValue);
                }}
                options={itemsTipUnidades}
                getOptionLabel={option => option.label}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={params => <TextField {...params} color="primary" />}
              />
            )}
          />

          <NlLabel>codUfFk</NlLabel>
          <Controller
            control={control}
            name="codUfFk"
            render={({ field }) => <Lov id="lovDoclastro" field={field} getData={getLovCodUfData} />}
          />
        </NlGridLayout>

        <div className="absolute right-6 bottom-4">
          <NlFormSaveButton />
        </div>
      </form>
    </>
  );
};

export default AdvancedFormTab;
