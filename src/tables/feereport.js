/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import { forwardRef } from "react";
import tableIcons from "@/utilities/tableIcons"

const FeeReport = () => {
  const data = [
    {
      id: "ID0002",
      name: "Student",
      school: "DMA",
      package: "Gold- 3 Month",
      fee: "20000",
      discount: "3000",
      paid: "10000",
      due: "7000",
      father: "Father",
      phone: "9874562145",
      address: "Sagar MP",
      bus: "Makrnia to DMA Bus",
      route: "Route Name",
    },
    {
      id: "ID001",
      name: "Student",
      school: "DMA",
      package: "Gold- 3 Month",
      fee: "20000",
      discount: "3000",
      paid: "10000",
      due: "7000",
      father: "Father",
      phone: "9874562145",
      address: "Sagar MP",
      bus: "Makrnia to DMA Bus",
      route: "Route Name",
    },
    {
      id: "ID001",
      name: "Student",
      school: "DMA",
      package: "Gold- 3 Month",
      fee: "20000",
      discount: "3000",
      paid: "10000",
      due: "7000",
      father: "Father",
      phone: "9874562145",
      address: "Sagar MP",
      bus: "Makrnia to DMA Bus",
      route: "Route Name",
    },
    {
      id: "ID001",
      name: "Student",
      school: "DMA",
      package: "Gold- 3 Month",
      fee: "20000",
      discount: "3000",
      paid: "10000",
      due: "7000",
      father: "Father",
      phone: "9874562145",
      address: "Sagar MP",
      bus: "Makrnia to DMA Bus",
      route: "Route Name",
    },
    {
      id: "ID001",
      name: "Student",
      school: "DMA",
      package: "Gold- 3 Month",
      fee: "20000",
      discount: "3000",
      paid: "10000",
      due: "7000",
      father: "Father",
      phone: "9874562145",
      address: "Sagar MP",
      bus: "Makrnia to DMA Bus",
      route: "Route Name",
    },
    {
      id: "ID001",
      name: "Student",
      school: "DMA",
      package: "Gold- 3 Month",
      fee: "20000",
      discount: "3000",
      paid: "10000",
      due: "7000",
      father: "Father",
      phone: "9874562145",
      address: "Sagar MP",
      bus: "Makrnia to DMA Bus",
      route: "Route Name",
    },
    {
      id: "ID001",
      name: "Student",
      school: "DMA",
      package: "Gold- 3 Month",
      fee: "20000",
      discount: "3000",
      paid: "10000",
      due: "7000",
      father: "Father",
      phone: "9874562145",
      address: "Sagar MP",
      bus: "Makrnia to DMA Bus",
      route: "Route Name",
    },
  ];

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
