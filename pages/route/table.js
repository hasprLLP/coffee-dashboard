/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import convertAMPM from "@/utilities/convertAMPM";
import tableIcons from '@/utilities/tableIcons'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data.data)

export default function RouteTable() {
  
  const { data, error } = useSWR(`route?populate=${JSON.stringify({ path: 'school bus' })}`, fetcher)

  //$ Mapped Data
  const dataShow = data?.map(item => {
    return {
      name: item.name,
      status: item.status,
      school: item.school?.name,
      bus: item.bus?.RCNumber,
      isRunning: item.isRunning ? "Running" : "Stopped",
      morningDeparture: convertAMPM(item?.morningDeparture),
      morningArrival: convertAMPM(item?.morningArrival),
      eveningDeparture: convertAMPM(item?.eveningDeparture),
      startsFrom: item.startsFrom?.address,
      avgDistance: item.avgDistance || "--",
      avgMorningDuration: item.avgMorningDuration || "--",
      avgEveningDuration: item.avgEveningDuration || "--",
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
            data={dataShow}
            title="Route Report Table View"
          />
        </div>
      </div>
    </div>
  )
}
