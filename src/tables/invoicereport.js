/* eslint-disable react/display-name */
import MaterialTable from "material-table";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const InvoiceReport = () => {
  const data = [
    { no: "INVOICE001", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE001", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE001", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE001", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE001", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE001", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE001", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE001", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE001", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
  ];

  const column = [
    { title: "Invoice No", field: "no" },
    { title: "Student ID No", field: "id" },
    { title: "Student", field: "student" },
    { title: "School", field: "school" },
    { title: "Date", field: "date" },
    { title: "Print Invoice", field: "print" },
  ];

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  return (
    <MaterialTable
      icons={tableIcons}
      options={{
        exportButton: true,
        filtering: true,
        search: true,
        exportAllData: true,
        filtering: true,
        showEmptyDataSourceMessage: true,
        showFirstLastPageButtons: true,
        showSelectAllCheckbox: true,
        showTextRowsSelected: true,
        searchAutoFocus: true,
        sorting: true,
        showTitle: true,
        draggable: true,
      }}
      columns={column}
      data={data}
      title="Invoice Report"
    />
  );
};

export default InvoiceReport;