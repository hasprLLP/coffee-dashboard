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

const FeeReport = () => {
  const data = [ { id: "ID0002", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, { id: "ID001", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, { id: "ID001", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, { id: "ID001", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, { id: "ID001", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, { id: "ID001", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, { id: "ID001", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, ];

  const column = [
    { title: "Student ID", field: "id" },
    { title: "Student Name", field: "name" },
    { title: "Package", field: "package" },
    { title: "Fee Amount", field: "fee" },
    { title: "Discount", field: "discount" },
    { title: "Paid Amt", field: "paid" },
    { title: "Due Amt", field: "due" },
    { title: "School", field: "school" },
    { title: "Father Name", field: "father" },
    { title: "Phone", field: "phone" },
    { title: "Address", field: "address" },
    { title: "Bus", field: "bus" },
    { title: "Route", field: "route" },
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
      className="mat-table"
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
      title="Fees Report"
    />
  );
};

export default FeeReport;
