/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import tableIcons from "@/utilities/tableIcons"

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
