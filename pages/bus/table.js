/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import { forwardRef } from 'react'
import tableIcons from '@/utilities/tableIcons'
import GoHome from '@/helpers/gohome'
import axios from 'axios'

axios.defaults.withCredentials = true

export default function BusTable() {
  //$ Online Data
  const onlineData = [
    {
      RCNumber: 'MP15CB7564',
      name: 'Red Bus',
      owner: { name: 'Halle Pathak' },
      selfOwn: false,
      vehicleType: 'Bus',
      capacity: '60',
      commission: '1000',
      avgSpeed: '60KM/HR',
      avgDistance: '150KM',
    },
    {
      RCNumber: 'MP15CB7564',
      name: 'Red Bus',
      owner: null,
      selfOwn: true,
      vehicleType: 'Bus',
      capacity: '60',
      commission: '1000',
      avgSpeed: '60KM/HR',
      avgDistance: '150KM',
    },
    {
      RCNumber: 'MP15CB7564',
      name: 'Red Bus',
      owner: { name: 'Halle Pathak' },
      selfOwn: false,
      vehicleType: 'Bus',
      capacity: '60',
      commission: '1000',
      avgSpeed: '60KM/HR',
      avgDistance: '150KM',
    },
    {
      RCNumber: 'MP15CB7564',
      name: 'Red Bus',
      owner: { name: 'Halle Pathak' },
      selfOwn: false,
      vehicleType: 'Bus',
      capacity: '60',
      commission: '1000',
      avgSpeed: '60KM/HR',
      avgDistance: '150KM',
    },
    {
      RCNumber: 'MP15CB7564',
      name: 'Red Bus',
      owner: { name: 'Halle Pathak' },
      selfOwn: false,
      vehicleType: 'Bus',
      capacity: '60',
      commission: '1000',
      avgSpeed: '60KM/HR',
      avgDistance: '150KM',
    },
    {
      RCNumber: 'MP15CB7564',
      name: 'Red Bus',
      owner: { name: 'Halle Pathak' },
      selfOwn: false,
      vehicleType: 'Bus',
      capacity: '60',
      commission: '1000',
      avgSpeed: '60KM/HR',
      avgDistance: '150KM',
    },
  ]
  //$ Mapped Data
  const data = onlineData.map(item => {
    return {
      rc: item.RCNumber,
      name: item.name,
      owner: item.owner?.name,
      self: item.selfOwn,
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
    { title: 'Self Owned', field: 'self' },
    { title: 'Type', field: 'type' },
    { title: 'Capacity', field: 'capacity' },
    { title: 'Commission', field: 'commission' },
    { title: 'Speed', field: 'avgSpeed' },
    { title: 'Distance', field: 'avgDistance' },
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
            title="Bus Report Table View"
          />
        </div>
      </div>
    </div>
  )
}
