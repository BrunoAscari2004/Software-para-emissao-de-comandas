import { TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "./shared/images/image_2023_11_20T21_33_51_071Z.png";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const generateColumns = (
  onChangeField: (field: keyof Row, value: any, id: Row["id"]) => any
): GridColDef[] => [
  {
    field: "produto",
    headerName: "Produto",
    flex: 1,
  },
  {
    field: "preco",
    headerName: "Preço",
    headerAlign: "right",
    flex: 1,
    align: "right",
    renderCell: (p: GridRenderCellParams<Row>) =>
      currencyFormatter.format(p.value),
  },
  {
    field: "quantidade",
    headerName: "Quantidade",
    type: "number",
    headerAlign: "left",
    flex: 1,
    renderCell: (params) => (
      <TextField
        value={params.row.quantidade}
        type="number"
        onChange={(e) =>
          onChangeField("quantidade", Number(e.target.value), params.row.id)
        }
      />
    ),
  },
  {
    field: "total",
    headerName: "Total",
    flex: 1,
    headerAlign: "right",
    align: "right",
    renderCell: (p: GridRenderCellParams<Row>) =>
      currencyFormatter.format(p.row.preco * p.row.quantidade),
  },
];

type Row = {
  id: number;
  produto: string;
  preco: number;
  quantidade: number;
};

function Home() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, produto: "Pastel", preco: 5.0, quantidade: 0 },
    { id: 2, produto: "Pipoca", preco: 2.0, quantidade: 0 },
    { id: 3, produto: "Cachorro-Quente", preco: 5.5, quantidade: 0 },
    { id: 4, produto: "Refrigerante", preco: 4.5, quantidade: 0 },
  ]);

  const total = rows.reduce(
    (acc, curr) => acc + curr.preco * curr.quantidade,
    0
  );

  useEffect(() => {});

  const editFieldRow = (field: keyof Row, value: any, id: Row["id"]) => {
    setRows((rows) =>
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handelUpdate = () => {};

  const handleCancel = () => {};

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-cyan-500 px-4 py-5 shadow-lg text-white z-10">
        <h1 className="text-xl font-bold ">Caixa da comunidade</h1>
        <img src="image_2023_11_20T21_33_51_071Z.png" alt="" />
      </header>
      <div className="h-[68px]"></div>
      <main className="p-4">
        <DataGrid
          disableRowSelectionOnClick
          rows={rows}
          columns={generateColumns(editFieldRow)}
          getRowId={(row) => row.id}
          hideFooterPagination
        />

        <div>
          TODO: Colocar no Footer do DataGrid (ler na doc){" "}
          {currencyFormatter.format(total)}
        </div>

        <div className="flex items-center justify-center gap-20 px-6 py-10 ">
          <button
            className="text-white bg-green-500 hover:bg-green-800   font-medium rounded-full text-lg px-8 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            onClick={() => {
              console.log(rows);
            }}
          >
            Finalizar
          </button>
          <button className="text-white bg-blue-500 hover:bg-blue-800   font-medium rounded-full text-lg px-8 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
            Resumo
          </button>
          <button
            className="text-white bg-red-500 hover:bg-red-800 font-medium rounded-full text-lg px-8 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => handleCancel}
          >
            Cancelar
          </button>
        </div>
      </main>
    </>
  );
}

export default Home;
