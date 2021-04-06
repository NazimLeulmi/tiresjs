import s from "../css/tires.module.css";
import Bar from "./bar";
import { DataGrid } from '@material-ui/data-grid';


function Tires() {
  const columns = [
    { field: 'type', headerName: 'Type' },
    { field: 'width', headerName: 'Width', type: 'number' },
    { field: 'percentage', headerName: 'Percentage', type: 'number' },
    { field: 'diameter', headerName: 'Diameter', type: 'number' },
    { field: 'brand', headerName: 'Brand' },
    { field: 'condition', headerName: 'Condition' },
    {
      field: 'index', headerName: 'Index',
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
    { field: 'group', headerName: 'Group' },
  ];
  return (
    <div className={s.container}>
      <Bar />
    </div>
  )
}

export default Tires;