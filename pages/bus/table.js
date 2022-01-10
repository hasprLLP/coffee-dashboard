/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import tableIcons from '@/utilities/tableIcons'
import useFetch from '@/hooks/useFetch'
import Loading from '@/blocks/loading'
import { useRouter } from 'next/router'

export default function BusTable() {
  const router = useRouter()

  const busData = useFetch(`bus?populate=${JSON.stringify({ path: 'owner' })}`)
  const data = busData?.data

  //$ Mapped Data
  const dataShow = data?.map(item => {
    return {
      rc: item.RCNumber,
      name: item.name,
      owner: item.owner?.name ? item.owner.name : item.selfOwn && 'Self Owned',
      type: item.vehicleType,
      capacity: item.capacity,
      commission: item.commission,
      avgSpeed: item.avgSpeed,
      avgDistance: item.avgDistance,
      raw: item,
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
                  onClick: (event, rowData) => router.push({ pathname: `/bus/edit/${rowData.raw.id}`, query: { data: JSON.stringify(rowData.raw) } }),
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
              title="Bus Report Table View"
            />
          </div>
        </div>
      </div>
    </>
  )
}
