/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import { useEffect, useState } from 'react'
import tableIcons from "@/utilities/tableIcons"
import axios from "axios";

axios.defaults.withCredentials = true;

export default function BusOwnerTable() {

  const [onlineData, setData] = useState([])

  //@ Fetch Bus API Function
  const getData = async () => {
    try {
      const populate = {
        path: 'buses',
      }
      const response = await axios.get(`owner?populate=${JSON.stringify(populate)}`)
      setData(response.data.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  //$ Mapped Data
  const data = onlineData.map(item => {
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
            data={data}
            title="Bus Owner Report Table View"
          />
        </div>
      </div>
    </div>
  );
}
