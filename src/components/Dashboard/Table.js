import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "username",
    headerName: "Username",
    width: 150,
    editable: true
  },
  {
    field: "name",
    headerName: "Full name",
    width: 150,
    editable: true
  },
  {
    field: "email",
    headerName: "E-mail",
    type: "string",
    width: 200,
    editable: true
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "string",
    width: 200,
    editable: true
  },
  {
    field: "website",
    headerName: "Phone",
    type: "string",
    width: 200,
    editable: true
  },
];

export default function DataTable() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "get"
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setdata(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
