/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import tableIcons from '@/utilities/tableIcons'
import useFetch from '@/hooks/useFetch'
import Loading from '@/blocks/loading'
import { useRouter } from 'next/router'

export default function DriverTable() {
  const router = useRouter()
  const operatorData = useFetch(`operator`)
  const data = operatorData?.data

  //$ Mapped Data
  const dataShow = data?.map(item => {
    return {
      name: item.name,
      pin: item.pin,
      phone: item.phone,
      isVerified: item.isVerified ? 'Verified' : 'Not Verified',
      active: item.active ? 'Active' : 'Disabled',
      raw: item,
    }
  })

  //$ Column
  const column = [
    { title: 'Driver', field: 'name' },
    { title: 'Pin', field: 'pin' },
    { title: 'Phone', field: 'phone' },
    { title: 'Verified', field: 'isVerified' },
    { title: 'Active', field: 'active' },
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
                  onClick: (event, rowData) =>
                    router.push({ pathname: `/driver/edit/${rowData.raw.id}`, query: { data: JSON.stringify(rowData.raw) } }),
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
              title="Driver Report Table View"
            />
          </div>
        </div>
      </div>
    </>
  )
}
