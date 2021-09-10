import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "first_name",
    headerName: "First name",
    width: 150,
    editable: true
  },
  {
    field: "last_name",
    headerName: "Last name",
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
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "first_name") || ""} ${params.getValue(params.id, "last_name") || ""
      }`
  }
];

export default function DataTable() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("https://reqres.in/api/users?page=2", {
      method: "get"
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setdata(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
