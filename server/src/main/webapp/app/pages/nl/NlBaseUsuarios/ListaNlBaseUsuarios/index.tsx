import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import INlBaseUsuarios from '@shared/@types/nl/INlBaseUsuarios';
import NlNewEntityButton from '@shared/components/NlButtons/NlNewEntityButton';
import NlSearchButton from '@shared/components/NlButtons/NlSearchButton';
import NlGridLayout from '@shared/components/NlGridLayout';
import NlLabel from '@shared/components/NlLabel';
import NlListLayout from '@shared/components/NlListLayout';
import NlPageTitle from '@shared/components/NlPageTitle';
import NlSearchSidebar from '@shared/components/NlSearchSidebar';
import { IRootState } from '@shared/store';
import { getNlBaseUsuarios, getNlBaseUsuariosByFilter } from '@shared/store/modules/nl/nlBaseUsuariosSlice';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

interface IDefaultValues {
  idUsuario: string;
  desUsuario: string;
  desEmail: string;
  desSenha: string;
  dtaCriacao: string;
  dtaAlteracao: string;
}

const defaultValues: IDefaultValues = {
  idUsuario: '',
  desEmail: '',
  desUsuario: '',
  desSenha: '',
  dtaCriacao: '',
  dtaAlteracao: '',
};

const ListaNlBaseUsuarios: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { handleSubmit, control, reset } = useForm({
    defaultValues,
  });

  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(0);
  const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nlBaseUsuarios = useSelector<IRootState, INlBaseUsuarios[]>(state => state.nlBaseUsuarios.nlBaseUsuarios);

  useEffect(() => {
    dispatch(getNlBaseUsuarios());
  }, []);

  const onSearchSubmit = (data: Partial<INlBaseUsuarios>) => {
    setIsLoading(true);

    try {
      dispatch(getNlBaseUsuariosByFilter(data));
    } catch (error) {
      toast.error(`${error}`);
    }

    setIsLoading(false);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleGoToForm = (row: INlBaseUsuarios) => {
    setIsLoading(true);
    history.push(`/formNlBaseUsuarios/${row.idUsuario}`);
  };

  return (
    <>
      <NlListLayout isLoading={isLoading}>
        <div className="w-full flex justify-between pb-3">
          <NlPageTitle>Usuários</NlPageTitle>
          <Button variant="contained" onClick={() => setIsSearchSidebarOpen(true)}>
            Pesquisar
            <FiSearch className="ml-1" />
          </Button>
        </div>

        {!nlBaseUsuarios ? (
          <Box display="flex" alignItems="center" justifyContent="center" width="100%">
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Box marginBottom={5}>
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">ID</TableCell>
                      <TableCell align="left">E-Mail</TableCell>
                      <TableCell align="left">Usuário</TableCell>
                      <TableCell align="left">Criado em</TableCell>
                      <TableCell align="left">Atualizado em</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {nlBaseUsuarios.length !== 0 ? (
                      (rowsPerPage > 0
                        ? nlBaseUsuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : nlBaseUsuarios
                      ).map(row => (
                        <TableRow key={row.idUsuario} style={{ cursor: 'pointer' }} onClick={() => handleGoToForm(row)}>
                          <TableCell align="right">{row.idUsuario}</TableCell>
                          <TableCell>{row.desEmail}</TableCell>
                          <TableCell>{row.desUsuario}</TableCell>
                          <TableCell>
                            {row.dtaCriacao ? new Date(row.dtaCriacao + 'T00:00').toLocaleDateString() : null}
                          </TableCell>
                          <TableCell>{row.dtaAlteracao ? new Date(row.dtaAlteracao).toLocaleString() : null}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="left" colSpan={5}>
                          Nenhum resultado encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[10, 15, 25, 50]}
                        colSpan={3}
                        count={nlBaseUsuarios.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        SelectProps={{
                          inputProps: { 'aria-label': 'linhas por páginas' },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        ActionsComponent={TablePaginationActions}
                        labelRowsPerPage="Linhas por página"
                        labelDisplayedRows={({ from, to, count }) =>
                          `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
                        }
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </div>
          </Box>
        )}
      </NlListLayout>

      <NlSearchSidebar
        open={isSearchSidebarOpen}
        onClose={() => setIsSearchSidebarOpen(false)}
        onErase={() => reset(defaultValues)}
      >
        <form onSubmit={handleSubmit(onSearchSubmit)}>
          <NlGridLayout>
            <NlLabel>Código:</NlLabel>
            <Controller
              control={control}
              name="idUsuario"
              render={({ field }) => (
                <TextField
                  {...field}
                  InputProps={{ inputProps: { min: 0 } }}
                  type="number"
                  variant="filled"
                  color="primary"
                />
              )}
            />

            <NlLabel>Email:</NlLabel>
            <Controller
              control={control}
              name="desEmail"
              render={({ field }) => <TextField {...field} variant="filled" color="primary" />}
            />

            <NlLabel>Nome:</NlLabel>
            <Controller
              control={control}
              name="desUsuario"
              render={({ field }) => <TextField {...field} variant="filled" color="primary" />}
            />

            <NlLabel>Criado em:</NlLabel>
            <Controller
              control={control}
              name="dtaCriacao"
              render={({ field }) => <TextField {...field} variant="filled" color="primary" type="date" />}
            />

            <NlLabel>Alterado em:</NlLabel>
            <Controller
              control={control}
              name="dtaAlteracao"
              render={({ field }) => (
                <>
                  <TextField {...field} variant="filled" color="primary" type="datetime-local" />
                </>
              )}
            />
          </NlGridLayout>

          <NlSearchButton onClick={() => setIsSearchSidebarOpen(false)} />
        </form>
      </NlSearchSidebar>
      <NlNewEntityButton onClick={() => history.push('/formNlBaseUsuarios')} />
    </>
  );
};

export default ListaNlBaseUsuarios;
