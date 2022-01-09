/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import tableIcons from "@/utilities/tableIcons"
import useSWR from 'swr'
import axios from "axios";

const fetcher = url => axios.get(url).then(res => res.data.data)

export default function BusOwnerTable() {

  const { data, error } = useSWR(`owner?populate=${JSON.stringify({ path: 'buses' })}`, fetcher)

  //$ Mapped Data
  const dataShow = data?.map(item => {
    return {
      name: item.name,
      phone: item.phone,
      buses: item.buses?.map(bus => { return `${bus.RCNumber}  ` }),
      password: item.password

  }
  })

  //$ Column
  const column = [
    { title: "Owner", field: "name" },
    { title: "Phone", field: "phone" },
    { title: "Buses", field: "buses" },
    { title: "Password", field: "password" },
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
            title="Bus Owner Report Table View"
          />
        </div>
      </div>
    </div>
  );
}
