/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import tableIcons from '@/utilities/tableIcons'
import useFetch from '@/hooks/useFetch'
import Loading from '@/blocks/loading'
import { useRouter } from 'next/router'

export default function PackageTable() {
  const router = useRouter()
  const packageData = useFetch(`package`)
  const data = packageData?.data

  const column = [
    { title: 'Package Name', field: 'name' },
    { title: 'Monthly', field: 'monthly' },
    { title: 'Quarterly', field: 'quarterly' },
    { title: 'Half Yearly', field: 'halfYearly' },
    { title: 'Annually', field: 'annually' },
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
                  onClick: (event, rowData) => router.push({ pathname: `/package/edit/${rowData.id}`, query: { data: JSON.stringify(rowData) } }),
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
              data={data}
              title="Package Report Table View"
            />
          </div>
        </div>
      </div>
    </>
  )
}
