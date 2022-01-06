/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import { forwardRef } from 'react'
import tableIcons from '@/utilities/tableIcons'
import axios from 'axios'

axios.defaults.withCredentials = true

export default function RouteTable() {

  //$ Data from Server
  const onlineData = [ { name: 'Route Name', status: 'Active', school: { name: 'DMA' }, bus: { RCNumber: 'MP15CB7654' }, isRunning: 'Running', morningDeparture: '08:15 AM', morningArrival: '10:10 AM', eveningDeparture: '02:15 PM', startsFrom: { location: { address: 'Makronia Square' } }, avgDistance: '8KM', avgMorningDuration: '20 Min', avgEveningDuration: '25 Min', }, { name: 'Route Name', status: 'Active', school: { name: 'DMA' }, bus: { RCNumber: 'MP15CB7654' }, isRunning: 'Running', morningDeparture: '08:15 AM', morningArrival: '10:10 AM', eveningDeparture: '02:15 PM', startsFrom: { location: { address: 'Makronia Square' } }, avgDistance: '8KM', avgMorningDuration: '20 Min', avgEveningDuration: '25 Min', }, { name: 'Route Name', status: 'Active', school: { name: 'DMA' }, bus: { RCNumber: 'MP15CB7654' }, isRunning: 'Running', morningDeparture: '08:15 AM', morningArrival: '10:10 AM', eveningDeparture: '02:15 PM', startsFrom: { location: { address: 'Makronia Square' } }, avgDistance: '8KM', avgMorningDuration: '20 Min', avgEveningDuration: '25 Min', }, { name: 'Route Name', status: 'Active', school: { name: 'DMA' }, bus: { RCNumber: 'MP15CB7654' }, isRunning: 'Running', morningDeparture: '08:15 AM', morningArrival: '10:10 AM', eveningDeparture: '02:15 PM', startsFrom: { location: { address: 'Makronia Square' } }, avgDistance: '8KM', avgMorningDuration: '20 Min', avgEveningDuration: '25 Min', }, { name: 'Route Name', status: 'Active', school: { name: 'DMA' }, bus: { RCNumber: 'MP15CB7654' }, isRunning: 'Running', morningDeparture: '08:15 AM', morningArrival: '10:10 AM', eveningDeparture: '02:15 PM', startsFrom: { location: { address: 'Makronia Square' } }, avgDistance: '8KM', avgMorningDuration: '20 Min', avgEveningDuration: '25 Min', }, { name: 'Route Name', status: 'Active', school: { name: 'DMA' }, bus: { RCNumber: 'MP15CB7654' }, isRunning: 'Running', morningDeparture: '08:15 AM', morningArrival: '10:10 AM', eveningDeparture: '02:15 PM', startsFrom: { location: { address: 'Makronia Square' } }, avgDistance: '8KM', avgMorningDuration: '20 Min', avgEveningDuration: '25 Min', }, ]

  //$ Mapped Data
  const data = onlineData.map(item => {
    return {
      name: item.name,
      status: item.status,
      school: item.school.name,
      bus: item.bus.RCNumber,
      isRunning: item.isRunning,
      morningDeparture: item.morningDeparture,
      morningArrival: item.morningArrival,
      eveningDeparture: item.eveningDeparture,
      startsFrom: item.startsFrom.location.address,
      avgDistance: item.avgDistance,
      avgMorningDuration: item.avgMorningDuration,
      avgEveningDuration: item.avgEveningDuration,
    }
  })

  //$ Columns
  const column = [
    { title: 'Name', field: 'name' },
    { title: 'Status', field: 'status' },
    { title: 'School', field: 'school' },
    { title: 'Bus', field: 'bus' },
    { title: 'Currently Running', field: 'isRunning' },
    { title: 'Morning Departure', field: 'morningDeparture' },
    { title: 'Morning School Arrival', field: 'morningArrival' },
    { title: 'Return Departure', field: 'eveningDeparture' },
    { title: 'Start Address', field: 'startsFrom' },
    { title: 'Distance', field: 'avgDistance' },
    { title: 'Morning Duration', field: 'avgMorningDuration' },
    { title: 'Return Duration', field: 'avgEveningDuration' },
  ]

  //& Return UI
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
            title="Route Report Table View"
          />
        </div>
      </div>
    </div>
  )
}
