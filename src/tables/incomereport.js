/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import tableIcons from "@/utilities/tableIcons"

const IncomeReport = () => {
  const data = [
    { id: "ID001", name: "Student Name", school: "DMA", bus: "Bus Name", owner: "Owner Name", income: "500" },
    { id: "ID001", name: "Student Name", school: "DMA", bus: "Bus Name", owner: "Owner Name", income: "500" },
    { id: "ID001", name: "Student Name", school: "DMA", bus: "Bus Name", owner: "Owner Name", income: "500" },
    { id: "ID001", name: "Student Name", school: "DMA", bus: "Bus Name", owner: "Owner Name", income: "500" },
    { id: "ID001", name: "Student Name", school: "DMA", bus: "Bus Name", owner: "Owner Name", income: "500" },
    { id: "ID001", name: "Student Name", school: "DMA", bus: "Bus Name", owner: "Owner Name", income: "500" },
    { id: "ID001", name: "Student Name", school: "DMA", bus: "Bus Name", owner: "Owner Name", income: "500" },
    { id: "ID001", name: "Student Name", school: "DMA", bus: "Bus Name", owner: "Owner Name", income: "500" },
  ];

  const column = [
    { title: "Student ID", field: "id" },
    { title: "Student Name", field: "name" },
    { title: "School", field: "school" },
    { title: "Bus", field: "bus" },
    { title: "Owner", field: "owner" },
    { title: "Income", field: "income" },
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
      }}
      columns={column}
      data={data}
      title="Income Report"
    />
  )
};

export default IncomeReport;
