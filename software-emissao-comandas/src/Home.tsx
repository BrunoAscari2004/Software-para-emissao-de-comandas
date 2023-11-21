import { useLayoutEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./shared/images/image_2023_11_20T21_33_51_071Z.png";

const columns = (setTotal: any, setQuantidade: any): GridColDef[] => [
  {
    field: "produto",
    headerName: "Produto",
    flex: 1,
  },
  {
    field: "preco",
    headerName: "Preço",
    flex: 1,
  },
  {
    field: "quantidade",
    headerName: "Quantidade",
    type: "number",
    headerAlign: "center",
    align: "center",
    flex: 1,
    editable: true,

    renderCell: (row) => setQuantidade(row.row),
  },
  {
    field: "total",
    headerName: "Total",
    flex: 1,
    headerAlign: "center",
    align: "center",
    type: "number",
    editable: true,
    renderCell: (row) => setTotal(row.row),
    /*renderCell: (params: GridRenderCellParams<any, IToDoBruno>) => (
      <Checkbox
        checked={!!params.value}
        onChange={() => {
          dispatch(changeConcluidoToDoListItens(params.row.codIdentificador as number));
        }}
      />
    ), */
  },
];

const rows = [
  { id: 1, produto: "Pastel", preco: 5.0, quantidade: 0, total: 0 },
  { id: 2, produto: "Pipoca", preco: 2.0, quantidade: 0, total: 0 },
  { id: 3, produto: "Cachorro-Quente", preco: 5.5, quantidade: 0, total: 0 },
  { id: 4, produto: "Refrigerante", preco: 4.5, quantidade: 0, total: 0 },
];

function Home() {
  const [total, setTotal] = useState();
  const [quantidade, setQuantidade] = useState();

  return (
    <>
      {console.log(total, quantidade)}
      <header className="fixed top-0 left-0 right-0 bg-cyan-500 px-4 py-5 shadow-lg text-white">
        <h1 className="text-xl font-bold ">Caixa da comunidade</h1>
        <img src="image_2023_11_20T21_33_51_071Z.png" alt="" />
      </header>
      <div id="header-overlay" className="h-[68px]"></div>
      <main className="p-4">
        <DataGrid
          disableRowSelectionOnClick
          rows={rows}
          columns={columns(setTotal, setQuantidade)}
          getRowId={(row) => row.id}
          hideFooterPagination
        />
      </main>
      <div id="buttons" className="flex items-center justify-center ">
        <div className="space-x-80 space-y-40">
          <button
            className="text-white bg-green-500 hover:bg-green-800   font-medium rounded-full text-lg px-8 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            onClick={() => {
              console.log(rows);
            }}
          >
            Finalizar
          </button>
          <button className="text-white bg-red-500 hover:bg-red-800 font-medium rounded-full text-lg px-8 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Cancelar
          </button>
          <button className="text-white bg-blue-500 hover:bg-blue-800   font-medium rounded-full text-lg px-8 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
            Resumo
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
