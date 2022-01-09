/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import tableIcons from '@/utilities/tableIcons'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data.data)

export default function BusTable() {

  const { data, error } = useSWR(`bus?populate=${JSON.stringify({ path: 'owner' })}`, fetcher)

  //$ Mapped Data
  const dataShow = data?.map(item => {
    return {
      rc: item.RCNumber,
      name: item.name,
      owner: item.owner?.name ? item.owner.name : item.selfOwn && "Self Owned",
      type: item.vehicleType,
      capacity: item.capacity,
      commission: item.commission,
      avgSpeed: item.avgSpeed,
      avgDistance: item.avgDistance,
    }
  })

  const column = [
    { title: 'Registration No', field: 'rc' },
    { title: 'Bus Name', field: 'name' },
    { title: 'Owner', field: 'owner' },
    { title: 'Type', field: 'type' },
    { title: 'Capacity', field: 'capacity' },
    { title: 'Commission', field: 'commission' },
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
            title="Bus Report Table View"
          />
        </div>
      </div>
    </div>
  )
}