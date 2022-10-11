import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SkeletonDataTable from "./SkeletonDataTable";

/**
 * Simulates server data loading
 */
const loadServerRows = (page, pageSize, allRows) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(allRows.slice(page * pageSize, (page + 1) * pageSize));
    }, Math.random() * 200 + 100); // simulate network latency
  });

const useQuery = (page, pageSize, allRows) => {
  const [rowCount, setRowCount] = useState(undefined);
  const [data, setData] = useState([]);

  useEffect(() => {
    let active = true;

    setRowCount(undefined);
    loadServerRows(page, pageSize, allRows).then((newRows) => {
      if (!active) {
        return;
      }
      setData(newRows);
      setRowCount(allRows.length);
    });

    return () => {
      active = false;
    };
  }, [page, pageSize, allRows]);

  return { data, rowCount };
};

/**
 * TODO: Improve `useDemoData` to move the fake pagination inside it instead of "fetching" everything of slicing in the component
 */
export default function DynamicDataTable() {
  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 5,
  });
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://62aafe25a62365888bd1ac28.mockapi.io/user`)
      .then((response) => response.json())
      .then((res) => {
        setRows(res);
        setIsLoading(false);
      });
  }, []);
  const { data, rowCount } = useQuery(rowsState.page, rowsState.pageSize, rows);

  // Some api client return undefine while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = React.useState(rowCount || 0);
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCountState]);

  return (
    <div
      style={{
        height: 400,
        width: "100%",
        backgroundColor: "#fff",
        color: "#1b1b1b",
        borderRadius: "8px",
        padding: 10,
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      }}
    >
      <DataGrid
        columns={columns}
        rows={data}
        rowCount={rowCountState}
        loading={isLoading}
        components={{
          LoadingOverlay: SkeletonDataTable,
        }}
        pagination
        {...rowsState}
        paginationMode="server"
        onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
        onPageSizeChange={(pageSize) =>
          setRowsState((prev) => ({ ...prev, pageSize }))
        }
        checkboxSelection
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </div>
  );
}

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    minWidth: 150,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    minWidth: 110,
  },
  {
    field: "job_title",
    headerName: "Job Title",
    minWidth: 200,
  },
  {
    field: "company_name",
    headerName: "Company Nname",
    minWidth: 200,
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 200,
  },
  {
    field: "number",
    headerName: "Mob No",
    sortable: false,
    minWidth: 160,
  },
];
