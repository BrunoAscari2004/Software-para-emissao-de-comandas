import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { object, string } from 'yup';
import loginLogoBottom from '@shared/assets/login_logo_bottom.png';
import loginLogoTop from '@shared/assets/login_logo_top.png';
import NlHeader from '@shared/components/NlHeader/NlHeader';
import NlPageTitle from '@shared/components/NlPageTitle';
import { IAppDispatch, IRootState } from '@shared/store';
import { login } from '@shared/store/modules/auth/authSlice';

type LoginProps = RouteComponentProps<any>;

interface IDefaultValues {
  email: string;
  password: string;
}

const defaultValues: IDefaultValues = {
  email: '',
  password: '',
};

const schema = object().shape({
  email: string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: string().required('Senha obrigatória'),
});

const NlLogin: React.FC<LoginProps> = ({ history }) => {
  const location = useLocation();
  const isAuthenticated = useSelector<IRootState, boolean>(state => state.auth.isAuthenticated);

  const { control, handleSubmit, formState } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const dispatch: IAppDispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/home');
    }
  }, [isAuthenticated]);

  const handleLoginSubmit = async (data: IDefaultValues) => {
    const { email, password } = data;

    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result) && location.pathname === '/') {
      history.push('/home');
    }
  };

  return (
    <>
      <NlHeader />
      <div className="p-5">
        <NlPageTitle>Login</NlPageTitle>
      </div>
      <div className="flex p-5 w-full items-center mt-5">
        <div className="flex flex-col items-center flex-1">
          <figure className="mb-5">
            <img src={loginLogoTop} alt="NL - Suporte a gestão" />
          </figure>

          <form onSubmit={handleSubmit(handleLoginSubmit)} className="flex flex-col">
            <p className="text-gray-500 text-left">E-mail:</p>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  color="primary"
                  variant="filled"
                />
              )}
            />

            <p className="text-gray-500 text-left mt-3">Password:</p>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  type="password"
                  color="primary"
                  variant="filled"
                />
              )}
            />

            <div className="flex items-center py-1">
              <Checkbox color="primary" />
              <span>Alterar senha</span>
            </div>

            <div className="flex justify-center">
              <Button variant="contained" color="primary" type="submit">
                ENTRAR
              </Button>
            </div>
          </form>

          <a href="/" className="mt-4 text-sm text-gray-500 hover:underline hover:text-gray-600 transition-colors">
            Esqueci minha senha/Solicitar senha
          </a>

          <img src={loginLogoBottom} alt="NL - Suporte à gestâo" className="mt-4" />
        </div>
      </div>
    </>
  );
};

export default NlLogin;
