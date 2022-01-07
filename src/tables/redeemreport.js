/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import tableIcons from "@/utilities/tableIcons"

const RedeemReport = () => {
  const data = [
    { bus: "Bus", school: "DMA", owner: "Owner Name", School: "DMA", total: "20000", redeem: "0", remaining: "20000", income: "20000", mode: "Monthly" },
    { bus: "Bus", school: "DMA", owner: "Owner Name", School: "DMA", total: "20000", redeem: "0", remaining: "20000", income: "20000", mode: "Monthly" },
    { bus: "Bus", school: "DMA", owner: "Owner Name", School: "DMA", total: "20000", redeem: "0", remaining: "20000", income: "20000", mode: "Monthly" },
    { bus: "Bus", school: "DMA", owner: "Owner Name", School: "DMA", total: "20000", redeem: "0", remaining: "20000", income: "20000", mode: "Monthly" },
    { bus: "Bus", school: "DMA", owner: "Owner Name", School: "DMA", total: "20000", redeem: "0", remaining: "20000", income: "20000", mode: "Monthly" },
    { bus: "Bus", school: "DMA", owner: "Owner Name", School: "DMA", total: "20000", redeem: "0", remaining: "20000", income: "20000", mode: "Monthly" },
    { bus: "Bus", school: "DMA", owner: "Owner Name", School: "DMA", total: "20000", redeem: "0", remaining: "20000", income: "20000", mode: "Monthly" },
    { bus: "Bus", school: "DMA", owner: "Owner Name", School: "DMA", total: "20000", redeem: "0", remaining: "20000", income: "20000", mode: "Monthly" },
  ];

  const column = [
    { title: "Bus Name", field: "bus" },
    { title: "Owner", field: "owner" },
    { title: "School", field: "school" },
    { title: "Total Amount", field: "total" },
    { title: "Redeem Amount", field: "redeem" },
    { title: "Remaining", field: "remaining" },
    { title: "Income", field: "income" },
    { title: "Payment Mode", field: "mode" },
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
      title="Redeem Report"
    />
  )
};

export default RedeemReport;
