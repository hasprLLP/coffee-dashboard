/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import { forwardRef } from "react";
import tableIcons from "@/utilities/tableIcons"
import axios from "axios";

axios.defaults.withCredentials = true;

export default function RouteTable() {

  const data = [ { id: "ID0002", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, { id: "ID001", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, { id: "ID001", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, { id: "ID001", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, { id: "ID001", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, { id: "ID001", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, { id: "ID001", name: "Student", school: "DMA", package: "Gold- 3 Month", fee: "20000", discount: "3000", paid: "10000", due: "7000", father: "Father", phone: "9874562145", address: "Sagar MP", bus: "Makrnia to DMA Bus", route: "Route Name", }, ];

  const column = [
    { title: "Route ID", field: "id" },
    { title: "Route Name", field: "name" },
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

  return (
    <div className="home">
      <div style={{ marginLeft: "5vw", width: "85%", height: "100%", marginTop: "5vw" }}>
        <div style={{ paddingBottom: "2vw", paddingTop: "2vw" }}>
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
              pageSize: 25,
              pageSizeOptions: [50, 100, 500, 1000],
            }}
            columns={column}
            data={data}
            title="Route Report Table View"
          />
        </div>
      </div>
    </div>
  );
}
