/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import convertAMPM from '@/utilities/convertAMPM'
import tableIcons from '@/utilities/tableIcons'
import useFetch from '@/hooks/useFetch'
import Loading from '@/blocks/loading'
import { useRouter } from 'next/router'

export default function RouteTable() {
  const router = useRouter()
  const routeData = useFetch(`route?populate=${JSON.stringify({ path: 'school bus' })}`)
  const data = routeData?.data

  //$ Mapped Data
  const dataShow = data?.map(item => {
    return {
      name: item.name,
      status: item.status,
      school: item.school?.name,
      bus: item.bus?.RCNumber,
      isRunning: item.isRunning ? 'Running' : 'Stopped',
      morningDeparture: convertAMPM(item?.morningDeparture),
      morningArrival: convertAMPM(item?.morningArrival),
      afternoonDeparture: convertAMPM(item?.afternoonDeparture),
      startsFrom: item.startsFrom?.address,
      avgDistance: item.avgDistance || '--',
      avgMorningDuration: item.avgMorningDuration || '--',
      avgEveningDuration: item.avgEveningDuration || '--',
      raw: item,
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
    { title: 'Return Departure', field: 'afternoonDeparture' },
    { title: 'Start Address', field: 'startsFrom' },
    { title: 'Distance', field: 'avgDistance' },
    { title: 'Morning Duration', field: 'avgMorningDuration' },
    { title: 'Return Duration', field: 'avgEveningDuration' },
  ]

  //& Return UI
  return (
    <>
      {!data && <Loading />}
      <div className="home">
        <div style={{ marginLeft: '5vw', width: '85%', height: '100%', marginTop: '5vw' }}>
          <div style={{ paddingBottom: '2vw', paddingTop: '2vw' }}>
            <MaterialTable
              icons={tableIcons}
              className="mat-table"
              actions={[
                {
                  icon: tableIcons.Edit,
                  tooltip: 'Edit',
                  onClick: (event, rowData) =>
                    router.push({ pathname: `/route/edit/${rowData.raw.id}`, query: { data: JSON.stringify(rowData.raw) } }),
                },
              ]}
              options={{
                actionsColumnIndex: -1,
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
                pageSize: 10,
                pageSizeOptions: [50, 100, 500, 1000],
              }}
              columns={column}
              data={dataShow}
              title="Route Report Table View"
            />
          </div>
        </div>
      </div>
    </>
  )
}
