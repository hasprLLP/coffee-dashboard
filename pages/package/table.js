/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import tableIcons from "@/utilities/tableIcons"
import useSWR from 'swr'
import axios from "axios";

const fetcher = url => axios.get(url).then(res => res.data.data)

export default function PackageTable() {
  const { data, error } = useSWR(`package`, fetcher)

  const column = [
    { title: 'Package Name', field: 'name' },
    { title: 'Monthly', field: 'monthly' },
    { title: 'Quarterly', field: 'quarterly' },
    { title: 'Half Yearly', field: 'halfYearly' },
    { title: 'Annually', field: 'annually' },
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
            title="Package Report Table View"
          />
        </div>
      </div>
    </div>
  )
}
