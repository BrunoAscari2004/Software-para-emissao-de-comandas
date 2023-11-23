import {
  CircularProgress,
  IconButton,
  IconButtonProps,
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
          onKeyDownCapture={(e) =>
            (e.key === "ArrowUp" || e.key === "ArrowDown") &&
            e.stopPropagation()
          }
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
    disableReorder: true,
    disableColumnMenu: true,
    disableExport: true,
    sortable: false,
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

  const handleConfirmPrintAll = async (products: Row[]) => {
    const confirmation = await confirmationToast(
      "Você tem certeza que deseja imprimir TODaS as impressões pendentes?"
    );
    if (!confirmation) return;
    handlePrint(products);
  };

  const handleConfirmPrint = async (product: Row) => {
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
    handlePrint([product]);
  };

  const handlePrint = async (productsToPrint: Row[]) => {
    console.log("Imprime e salva ", productsToPrint);
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Chamada À API
    } catch (e) {
      console.error(e);
      toast.error("Não foi possível concluir a comunicação com o servidor");
    } finally {
      setLoading(false);
    }
    setOriginalRows((state) => {
      return Object.fromEntries(
        Object.entries(state).filter(
          ([key]) => !productsToPrint.some((prod) => prod.id === Number(key))
        )
      );
    });
    setEditedRows((state) =>
      state.filter(
        (editedProd) =>
          !productsToPrint.some((prod) => prod.id === editedProd.id)
      )
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-blue-500 shadow-lg text-white z-10">
        <div className="relative flex-1 px-4 py-5">
          <h1 className="text-xl font-bold ">Caixa da comunidade</h1>
        </div>
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
          columns={generateColumns(editFieldRow, handleConfirmPrint)}
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 25, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          slots={{
            footer: () => (
              <div className="flex font-bold text-lg border-t-2 border-blue-500 flex-col">
                <div className="flex justify-between py-2 pl-2">
                  <span>Total:</span>
                  <div className="flex flex-row items-center">
                    <span>{currencyFormatter.format(total)}</span>
                    <div className="w-[65px] flex justify-center">
                      <PrintAllButton
                        editedProducts={editedRows}
                        originalProducts={originalRows}
                        onClick={handleConfirmPrintAll}
                      />
                    </div>
                  </div>
                </div>
                <GridFooter style={{ borderColor: "#D1D5DB" }} />
              </div>
            ),
          }}
        />
        <div className="flex items-center justify-center gap-20 px-6 py-10 "></div>

        <footer className="fixed bottom-1 right-4">
          <span className="text-gray-500 text-xs">
            Feito por Gustavo André Cauzzi, Bruno Ascari e João Vitor Bufon de
            Almeida como cortesia da família NL ❤
          </span>
        </footer>
      </main>
    </>
  );
}

interface PrintAllButtonProps extends Omit<IconButtonProps, "onClick"> {
  editedProducts: Row[];
  originalProducts: Record<Row["id"], Row>;
  onClick: (productsToPrint: Row[]) => any;
}
const PrintAllButton: React.FC<PrintAllButtonProps> = ({
  editedProducts,
  originalProducts,
  onClick,
  ...props
}) => {
  const productsToPrint = editedProducts.filter(
    (editedProduct) =>
      editedProduct.quantidade > originalProducts[editedProduct.id].quantidade
  );

  console.log("editedProducts: ", editedProducts);
  console.log("productsToPrint: ", productsToPrint);
  const shouldRender = productsToPrint.length > 1;

  return (
    <Tooltip title={shouldRender ? "Imprimir todos" : ""} arrow placement="top">
      <div
        className={`transition-all ${shouldRender ? "opacity-1" : "opacity-0"}`}
      >
        <IconButton
          {...props}
          disabled={!shouldRender}
          onClick={() => onClick(productsToPrint)}
        >
          <FiPrinter className="text-blue-500" size={20} />
        </IconButton>
      </div>
    </Tooltip>
  );
};

export default Home;
