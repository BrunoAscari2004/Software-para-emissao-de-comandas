import { useLayoutEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
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
    flex: 1,
  },
  {
    field: "total",
    headerName: "Total",
    flex: 1,
  },
];

const rows = [{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 }];

function Home() {
  const [count, setCount] = useState();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-cyan-500 px-4 py-5 shadow-lg text-white">
        <h1 className="text-xl font-bold">Caixa da comunidade</h1>
      </header>
      <div id="header-overlay" className="h-[68px]"></div>
      <main className="p-4">
        <DataGrid rows={rows} columns={columns} />
      </main>
    </>
  );
}

export default Home;
