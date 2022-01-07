/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import tableIcons from "@/utilities/tableIcons"

const InvoiceReport = () => {
  const data = [
    { no: "INVOICE001", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE002", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE003", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE004", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE005", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE006", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE007", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE008", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
    { no: "INVOICE0077", id: "ID001", student: "Student Name", school: "DMA", date: "02/07/1998", print: "Print Invoice" },
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
        pageSize: 5,
        pageSizeOptions: [50, 100, 500, 1000],
        actionsColumnIndex: -1,
      }}
      columns={column}
      data={data}
      actions={[
        {
          icon: tableIcons.Print,
          tooltip: 'Print',
          onClick: (event, rowData) => alert('Print Invoice For ' + rowData.no),
        },
      ]}
      title="Invoice Report"
    />
  )
};

export default InvoiceReport;
