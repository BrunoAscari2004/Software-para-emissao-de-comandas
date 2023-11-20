import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

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
    <div id="root">
      <header>oi</header>
      <div id="main">
        <div id="grid">
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default Home;
