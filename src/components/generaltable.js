/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import tableIcons from '@/utilities/tableIcons'

const GeneralTable = ({ title, data, column }) => {
  return (
      <div style={{ width: '95%', height: '100%' }}>
        <div style={{ paddingBottom: '2vw', paddingTop: '1vw' }}>
          <MaterialTable
            icons={tableIcons}
            className="mat-table"
            actions={[
              {
                icon: tableIcons.Print,
                tooltip: 'Print Invoice',
                onClick: (event, rowData) => alert('Print Invoice'),
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
            title={title}
          />
      </div>
    </div>
  )
}

export default GeneralTable
