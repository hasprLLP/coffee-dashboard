/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import { useEffect,useState } from "react";
import tableIcons from "@/utilities/tableIcons"
import axios from "axios";

axios.defaults.withCredentials = true;

export default function SchoolTable() {
  const [onlineData, setData] = useState([])

  //@ Fetch Bus API Function
  const getData = async () => {
    try {
      const response = await axios.get("school/")
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
      prefix: item.prefix,
      phone: item.phone,
      city: item.city,
      state: item.state,
      pincode: item.zip,
      address: item.location?.address
    }
  })

  //$ Column
  const column = [
    { title: 'Name', field: 'name' },
    { title: 'Prefix', field: 'prefix' },
    { title: 'Phone', field: 'phone' },
    { title: 'City', field: 'city' },
    { title: 'State', field: 'state' },
    { title: 'Pincode', field: 'pincode' },
    { title: 'Address', field: 'address' },
  ]

  return (
    <div className="home">
      <div style={{ marginLeft: '5vw', width: '85%', height: '100%', marginTop: '5vw' }}>
        <div style={{ paddingBottom: '2vw', paddingTop: '2vw' }}>
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
            title="School Report Table View"
          />
        </div>
      </div>
    </div>
  )
}
