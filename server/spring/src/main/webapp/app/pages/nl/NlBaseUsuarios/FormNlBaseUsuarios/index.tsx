import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { number, object, string } from 'yup';
import INlBaseUsuarios from '@shared/@types/nl/INlBaseUsuarios';
import NlCrudBarFooter from '@shared/components/NlButtons/NlCrudBarFooter';
import NlFormLayout from '@shared/components/NlFormLayout';
import NlLabel from '@shared/components/NlLabel';
import { IAppDispatch, IRootState } from '@shared/store';
import {
  getNlBaseUsuario,
  removeNlBaseUsuario,
  resetNlBaseUsuario,
  saveNlBaseUsuario,
} from '@shared/store/modules/nl/nlBaseUsuarioSlice';
import NlGridLayout from '@shared/components/NlGridLayout';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

interface RouteParams {
  idUsuario?: string;
}

interface IDefaultValues {
  idUsuario: number;
  desUsuario: string;
  desEmail: string;
  desSenha: string;
  dtaCriacao: string;
  dtaAlteracao: string;
}

const defaultValues: IDefaultValues = {
  idUsuario: 0,
  desEmail: '',
  desUsuario: '',
  desSenha: '',
  dtaCriacao: format(new Date(Date.now()), 'yyyy-MM-dd'),
  dtaAlteracao: new Date(Date.now()).toISOString().replace('Z', ''),
};

const createSchema = (id?: string) => {
  return object().shape({
    idUsuario: number().required('Obrigatório informar um id'),
    desEmail: string().email('E-mail inválido').required('Obrigatório informar um email'),
    desSenha: id ? string() : string().required('Obrigatório informar uma senha'),
    desUsuario: string().required('Obrigatório informar um nome'),
  });
};

const FormNlBaseUsuarios: React.FC = () => {
  const history = useHistory();
  const dispatch: IAppDispatch = useDispatch();
  const { idUsuario: idUsuarioParam } = useParams<RouteParams>();

  const { handleSubmit, control, setValue, formState, reset, watch } = useForm({
    defaultValues,
    resolver: yupResolver(createSchema(idUsuarioParam)),
  });

  const wNome = watch('desUsuario');

  const entity = useSelector<IRootState, INlBaseUsuarios | null>(state => state.nlBaseUsuario.nlBaseUsuario);

  const { errors }: { errors: FieldErrors } = formState;

  useEffect(() => {
    for (const i of Object.keys(errors)) {
      toast.error(`${i} - ${errors[i].message}`);
    }
  }, [errors]);

  const [isLoading, setIsLoading] = useState(false);
  const [novo, setNovo] = useState(false);

  const getCurrentUser = async () => {
    setIsLoading(true);
    if (idUsuarioParam) {
      const result = await dispatch(getNlBaseUsuario({ idUsuario: idUsuarioParam }));

      if (getNlBaseUsuario.rejected.match(result)) {
        history.goBack();
      }
    } else {
      await dispatch(resetNlBaseUsuario());
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCurrentUser();
    if (!idUsuarioParam) {
      reset(defaultValues);
      setNovo(true);
    }
  }, [idUsuarioParam]);

  useEffect(() => {
    if (entity) {
      const { desEmail, desSenha, desUsuario, idUsuario, dtaCriacao, dtaAlteracao } = entity;

      setValue('desEmail', desEmail);
      setValue('desSenha', desSenha);
      setValue('desUsuario', desUsuario);
      setValue('idUsuario', idUsuario);
      setValue('dtaCriacao', dtaCriacao ?? defaultValues.dtaCriacao);
      setValue('dtaAlteracao', dtaAlteracao ?? defaultValues.dtaAlteracao);
    }
  }, [entity]);

  const handleOnDelete = async () => {
    setIsLoading(true);

    const result = await dispatch(removeNlBaseUsuario(idUsuarioParam ?? ''));

    if (removeNlBaseUsuario.rejected.match(result)) {
      toast.error('Não foi possível deletar o registro no banco');
    } else if (removeNlBaseUsuario.fulfilled.match(result)) {
      toast.success('Registro deletado');
      history.goBack();
    }

    setIsLoading(false);
  };

  const onSubmit = async (data: IDefaultValues) => {
    setIsLoading(true);

    const { desEmail, desSenha, desUsuario, idUsuario, dtaCriacao, dtaAlteracao } = data;
    const result = await dispatch(
      saveNlBaseUsuario({
        desEmail: desEmail ?? '',
        desSenha: desSenha ?? '',
        desUsuario: desUsuario ?? '',
        idUsuario,
        dtaCriacao,
        dtaAlteracao,
      }),
    );

    if (saveNlBaseUsuario.rejected.match(result)) {
      toast.error('Ocorreu um erro ao salvar');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);

    history.goBack();
    toast.success('Registro salvo');
  };

  return (
    <>
      <NlFormLayout isLoading={isLoading} title={`Usuário - ${wNome ? wNome : 'Novo'}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NlGridLayout>
            <NlLabel>Código:</NlLabel>
            <Controller
              control={control}
              name="idUsuario"
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  variant="filled"
                  color="primary"
                  disabled={true}
                  error={!!errors.idUsuario}
                  helperText={errors.idUsuario ? errors.idUsuario.message : ''}
                />
              )}
            />
            <NlLabel>Email:</NlLabel>
            <Controller
              control={control}
              name="desEmail"
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  color="primary"
                  error={!!errors.desEmail}
                  helperText={errors.desEmail ? errors.desEmail.message : ''}
                />
              )}
            />
            <NlLabel>Nome:</NlLabel>
            <Controller
              control={control}
              name="desUsuario"
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  color="primary"
                  error={!!errors.desUsuario}
                  helperText={errors.desUsuario ? errors.desUsuario.message : ''}
                />
              )}
            />
            {novo && (
              <>
                <NlLabel>Senha:</NlLabel>
                <Controller
                  control={control}
                  name="desSenha"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="filled"
                      color="primary"
                      type="password"
                      error={!!errors.desSenha}
                      helperText={errors.desSenha ? errors.desSenha.message : ''}
                    />
                  )}
                />
              </>
            )}

            <NlLabel>Criado em:</NlLabel>
            <Controller
              control={control}
              name="dtaCriacao"
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  color="primary"
                  type="date"
                  error={!!errors.dtaCriacao}
                  helperText={errors.dtaCriacao ? errors.dtaCriacao.message : ''}
                />
              )}
            />

            <NlLabel>Alterado em:</NlLabel>
            <Controller
              control={control}
              name="dtaAlteracao"
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    variant="filled"
                    color="primary"
                    type="datetime-local"
                    error={!!errors.dtaCriacao}
                    helperText={errors.dtaCriacao ? errors.dtaCriacao.message : ''}
                  />
                </>
              )}
            />
          </NlGridLayout>

          <NlCrudBarFooter onDeleteClick={handleOnDelete} onGoBackClick={() => history.goBack()} disableDelete={novo} />
        </form>
      </NlFormLayout>
    </>
  );
};

export default FormNlBaseUsuarios;
