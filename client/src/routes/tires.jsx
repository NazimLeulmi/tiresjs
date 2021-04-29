import s from "../css/tires.module.css";
import Bar from "./bar";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React from "react";



function Tires() {
  const [tires, setTires] = React.useState([])
  const columns = [
    { field: '_id', headerName: 'Id', flex: 1 },
    { field: 'width', headerName: 'Width', type: 'number', width: 150 },
    { field: 'percentage', headerName: 'Percentage', type: 'number', width: 150 },
    { field: 'diameter', headerName: 'Diameter', type: 'number', width: 150 },
    { field: 'brand', headerName: 'Brand' },
    { field: 'condition', headerName: 'Condition', width: 150 },
    { field: 'group', headerName: 'Group', flex: 1 },
    { field: 'type', headerName: 'Type' },
  ];

  let getTires = async () => {
    let response = await axios.get("/tires");
    setTires(response.data);
  }

  React.useEffect(() => {
    getTires();
  }, [])

  return (
    <div className={s.container}>
      <Bar />
      <div className={s.table}>
        <DataGrid rows={tires} columns={columns}
          autoPageSize getRowId={(row) => row._id}
        />
      </div>
    </div>
  )
}

export default Tires;