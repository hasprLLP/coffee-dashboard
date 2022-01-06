/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import { forwardRef } from "react";
import tableIcons from "@/utilities/tableIcons"
import axios from "axios";

axios.defaults.withCredentials = true;

export default function DriverTable() {

//$ Online Data
  const onlineData = [
    {
      name: "Halle Mulle",
      pin: "0000",
      phone: "9845716325",
      isVerified: true,
      active: true,
      route: { name: "Makronia to DMA" },

    }
  ]

  //$ Mapped Data
  const data = onlineData.map(item => {
    return {
      name: item.name,
      pin: item.pin,
      phone: item.phone,
      isVerified: item.isVerified,
      active: item.active,
      route: item.route.name,
    }
  })

  //$ Column
  const column = [
    { title: "Driver", field: "name" },
    { title: "Pin", field: "pin" },
    { title: "Phone", field: "phone" },
    { title: "Verified", field: "isVerified" },
    { title: "Active", field: "active" },
    { title: "Route Assigned", field: "route" },
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
              pageSize: 5,
              pageSizeOptions: [50, 100, 500, 1000],
            }}
            columns={column}
            data={data}
            title="Driver Report Table View"
          />
        </div>
      </div>
    </div>
  );
}
