import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import React, { useState } from 'react';
import { listaTableTab } from './data/TableTabData';

const itensTipCaixa = {
  1: 'PDV',
  2: 'Cofre gerência',
  3: 'Boca de lobo',
  4: 'Totem',
  5: 'Farmácia',
  6: 'OMS',
  7: 'APP SAT',
  8: 'Crediário',
  9: 'Outro',
};

const TableTab: React.FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function getLista() {
    return rowsPerPage > 0 ? listaTableTab.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : listaTableTab;
  }

  return (
    <Box marginBottom={5}>
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Caixa</TableCell>
                <TableCell align="left">Descrição</TableCell>
                <TableCell align="right">Unidade</TableCell>
                <TableCell align="left">Descrição</TableCell>
                <TableCell align="left">Tipo de caixa</TableCell>
                <TableCell align="right">ECF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listaTableTab.length !== 0 ? (
                getLista().map(row => (
                  <TableRow
                    key={row.codCaixa}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <TableCell align="right">{row.codCaixa}</TableCell>
                    <TableCell align="left">{row.desCaixa}</TableCell>
                    <TableCell align="right">{row.codUnidade}</TableCell>
                    <TableCell align="left">{row.codUnidadeFk.desNome}</TableCell>
                    <TableCell align="left">{itensTipCaixa[row.tipCaixa]}</TableCell>
                    <TableCell align="right">{row.numEcf}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="left" colSpan={4}>
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
                  count={listaTableTab.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'linhas por páginas',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  ActionsComponent={TablePaginationActions}
                  labelRowsPerPage="Linhas por página"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} ${count !== -1 ? '' : 'mais'} de ${count !== -1 ? count : to}`
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default TableTab;
