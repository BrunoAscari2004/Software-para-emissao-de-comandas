import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import NlFormSaveButton from '@shared/components/NlButtons/NlFormSaveButton';
import NlGridLayout from '@shared/components/NlGridLayout';
import NlLabel from '@shared/components/NlLabel';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { object, string } from 'yup'; // Biblioteca responsável pelas validações

type IDefaultValues = typeof defaultValues;

const defaultValues = {
  desEmail: '',
  desSenha: '',
};

// O schema do yup irá dizer ao react-hook-form como
// que esperamos que o resultado do nosso formulário seja
const schema = object().shape({
  desEmail: string().required('Obrigatório informar um email').email('E-mail inválido'),
  desSenha: string()
    .required('Obrigatório informar uma senha')
    .min(4, 'No mínimo 4 digitos')
    .max(13, 'No máximo 13 digitos'),
});
// desEmail: precisa ser uma string | é obrigatório | precisa ser um email
// desSenha: precisa ser uma string | é obrigatório | no mínimo 4 digitos | no máximo 13 digitos

const ValidationsTab: React.FC = () => {
  const { control, handleSubmit, formState } = useForm({
    defaultValues,
    resolver: yupResolver(schema), // Passar o schema para o resolver
  });

  const { errors } = formState; // Dentro do form state, podemos pegar os erros que ocorreram

  function onSubmit(data: IDefaultValues) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NlGridLayout>
        <NlLabel>desEmail</NlLabel>
        <Controller
          control={control}
          name="desEmail"
          render={({ field }) => (
            <TextField
              {...field}
              color="primary"
              variant="filled"
              error={!!errors.desEmail} // setar no campo se ele está com erro ou não
              helperText={errors.desEmail ? errors.desEmail.message : ''} // mensagem de erro
            />
          )}
        />

        <NlLabel>desSenha</NlLabel>
        <Controller
          control={control}
          name="desSenha"
          render={({ field }) => (
            <TextField
              {...field}
              color="primary"
              variant="filled"
              error={!!errors.desSenha} // setar no campo se ele está com erro ou não
              helperText={errors.desSenha ? errors.desSenha.message : ''} // mensagem de erro
            />
          )}
        />
      </NlGridLayout>

      <div className="absolute right-6 bottom-4">
        <NlFormSaveButton />
      </div>
    </form>
  );
};

export default ValidationsTab;
