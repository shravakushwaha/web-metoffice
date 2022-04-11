import "./datatable.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";

export default function DataTable({
  loading,
  columns,
  metofficeRows,
  onPageChange,
}) {
  return (
    <div>
      <div>{loading ? <LinearProgress /> : ``}</div>
      <div className="datagrid">
        <DataGrid
          rows={metofficeRows}
          columns={columns}
          pageSize={49}
          // paginationMode="server"
          rowsPerPageOptions={[49]}
          // onPageChange={onPageChange}
          onPageChange={(page) => {
            onPageChange(page);
          }}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  );
}
