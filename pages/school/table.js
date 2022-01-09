/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import tableIcons from "@/utilities/tableIcons"
import useSWR from 'swr'
import axios from "axios";

const fetcher = url => axios.get(url).then(res => res.data.data)

export default function SchoolTable() {

  const { data, error } = useSWR(`school`, fetcher)

  //$ Mapped Data
  const dataShow = data?.map(item => {
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
            data={dataShow}
            title="School Report Table View"
          />
        </div>
      </div>
    </div>
  )
}
