/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import tableIcons from "@/utilities/tableIcons"
import useSWR from 'swr'
import axios from "axios";

const fetcher = url => axios.get(url).then(res => res.data.data)

export default function DriverTable() {

  const { data, error } = useSWR(`operator`, fetcher)

  //$ Mapped Data
  const dataShow = data?.map(item => {
    return {
      name: item.name,
      pin: item.pin,
      phone: item.phone,
      isVerified: item.isVerified ? "Verified" : "Not Verified",
      active: item.active ? "Active" : "Disabled",
    }
  })

  //$ Column
  const column = [
    { title: "Driver", field: "name" },
    { title: "Pin", field: "pin" },
    { title: "Phone", field: "phone" },
    { title: "Verified", field: "isVerified" },
    { title: "Active", field: "active" },
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
            data={dataShow}
            title="Driver Report Table View"
          />
        </div>
      </div>
    </div>
  );
}
