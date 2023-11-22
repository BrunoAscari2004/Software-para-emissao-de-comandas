import {
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFooter,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiPrinter, FiSave } from "react-icons/fi";
import { confirmationToast } from "../../shared/components/ConfirmationToast";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const generateColumns = (
  onChangeField: (field: keyof Row, value: any, id: Row["id"]) => any,
  handlePrint: (row: Row) => any
): GridColDef[] => [
  {
    field: "nome",
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
    renderCell: (params) => {
      const isMoreThanBefore = params.row.quantidade > params.row.originalQtd;
      const isFewerThanBefore = params.row.quantidade < params.row.originalQtd;
      const hasChanged = isFewerThanBefore || isMoreThanBefore;

      const textColor = isMoreThanBefore ? "#3B82F6" : "red";

      return (
        <TextField
          value={params.row.quantidade}
          type="number"
          fullWidth
          inputProps={{
            style: {
              color: hasChanged ? textColor : undefined,
              fontWeight: hasChanged ? "bold" : "",
            },
          }}
          onChange={(e) =>
            onChangeField("quantidade", Number(e.target.value), params.row.id)
          }
        />
      );
    },
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
  {
    field: "imprimir",
    renderHeader: () => <FiPrinter className="text-blue-500" size={20} />,
    width: 60,
    headerAlign: "center",
    align: "center",
    renderCell: (p) => {
      const isMoreThanBefore = p.row.quantidade > p.row.originalQtd;
      const isFewerThanBefore = p.row.quantidade < p.row.originalQtd;
      const hasChanged = isFewerThanBefore || isMoreThanBefore;

      const tooltipText = isMoreThanBefore ? "Imprimir" : "Salvar";

      return (
        <Tooltip title={hasChanged ? tooltipText : ""} placement="top" arrow>
          <div
            className={`transition-all ${
              hasChanged ? "opacity-1" : "opacity-0"
            }`}
          >
            <IconButton onClick={() => hasChanged && handlePrint(p.row)}>
              {isMoreThanBefore && (
                <FiPrinter className="text-blue-500" size={20} />
              )}
              {isFewerThanBefore && (
                <FiSave className="text-red-500" size={20} />
              )}
            </IconButton>
          </div>
        </Tooltip>
      );
    },
  },
];

type Row = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

function Home() {
  const [originalRows, setOriginalRows] = useState<Record<Row["id"], Row>>({});
  const [editedRows, setEditedRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [products, setRows] = useState<Row[]>([
    { id: 1, nome: "Pastel", preco: 5.0, quantidade: 0 },
    { id: 2, nome: "Pipoca", preco: 2.0, quantidade: 0 },
    { id: 3, nome: "Cachorro-Quente", preco: 5.5, quantidade: 0 },
    { id: 4, nome: "Refrigerante", preco: 4.5, quantidade: 0 },
  ]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const total = products.reduce(
    (acc, curr) => acc + curr.preco * curr.quantidade,
    0
  );

  const editFieldRow = (field: keyof Row, value: any, id: Row["id"]) => {
    const { edited, newRows, origin } = products.reduce(
      (acc, row) => {
        if (row.id === id) {
          acc.origin = row;
          acc.edited = { ...row, [field]: value };
          acc.newRows.push(acc.edited);
        } else {
          acc.newRows.push(row);
        }
        return acc;
      },
      {
        edited: null as null | Row,
        origin: null as null | Row,
        newRows: [] as Row[],
      }
    );

    if (!edited || !origin) {
      toast.error("Linha a ser editada não foi encontrada.");
      return;
    }

    if (!(edited.id in originalRows)) {
      setOriginalRows((state) => ({ ...state, [edited.id]: origin }));
      setEditedRows([...editedRows, edited]);
    } else {
      setEditedRows((state) =>
        state.map((alreadyEditedRow) =>
          alreadyEditedRow.id === edited.id ? edited : alreadyEditedRow
        )
      );
    }

    setRows(newRows);
  };

  const handlePrint = async (product: Row) => {
    const qtdToPrint = product.quantidade - originalRows[product.id].quantidade;

    const message =
      qtdToPrint < 0 ? (
        <>
          <span className="text-red-500 font-bold">Atenção: </span>
          <span>
            Você está diminuindo {Math.abs(qtdToPrint)} unidade(s) do produto "
            {product.nome}". Você tem certeza de que deseja fazer isso?
          </span>
        </>
      ) : (
        `Tens certeza que deseja imprimir ${qtdToPrint} unidade${
          qtdToPrint > 1 ? "s" : ""
        } de ${product.nome}?`
      );

    const confirmation = await confirmationToast(message);
    if (!confirmation) return;
    console.log("Imprime e salva ", product);
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Chamada À API
    } catch (e) {
      console.error(e);
      toast.error("Não foi possível concluir a comunicação com o servidor");
    } finally {
      setLoading(false);
    }
    setOriginalRows({});
    setEditedRows([]);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-blue-500 px-4 py-5 shadow-lg text-white z-10">
        <h1 className="text-xl font-bold ">Caixa da comunidade</h1>
      </header>
      <div className="h-[68px]"></div>

      <div
        className={`fixed flex inset-0 z-[100] justify-center items-center bg-[#fff9] ${
          loading ? "opacity-1" : "opacity-0 pointer-events-none"
        } transition-all duration-500`}
      >
        <div className="bg-white rounded-full flex p-6 shadow-lg items-center gap-5">
          <CircularProgress size={30} />
          <span className="text-gray-600">Carregando...</span>
        </div>
      </div>

      <main className="p-4">
        <DataGrid
          disableRowSelectionOnClick
          rows={products.map((product) => ({
            ...product,
            originalQtd: originalRows[product.id]?.quantidade,
          }))}
          columns={generateColumns(editFieldRow, handlePrint)}
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 25, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          slots={{
            footer: () => (
              <footer className="flex font-bold text-lg border-t-2 border-blue-500 flex-col">
                <div className="flex justify-between py-2 px-2 pr-[70px]">
                  <span>Total:</span>
                  <span>{currencyFormatter.format(total)}</span>
                </div>
                <GridFooter style={{ borderColor: "#D1D5DB" }} />
              </footer>
            ),
          }}
        />
        <div className="flex items-center justify-center gap-20 px-6 py-10 "></div>
      </main>
    </>
  );
}

export default Home;
