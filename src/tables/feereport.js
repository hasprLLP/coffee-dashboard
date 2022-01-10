/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import tableIcons from '@/utilities/tableIcons'
import useFetch from '@/hooks/useFetch'
import Loading from '@/blocks/loading'

const FeeReport = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const feeData = useFetch(
    `transaction?populate=${JSON.stringify({ path: 'route passenger appUser ', populate: { path: 'feePackage bus school lastTransaction' } })}`
  )

  //$ Mapped Data
  const data = feeData?.data?.map(item => {
    return {
      date: item?.date?.substring(0, 10),
      name: item?.passenger?.name,
      id: item?.passenger?.passengerID,
      school: item?.passenger?.school?.name,
      package: item?.passenger?.feePackage?.name,
      pack: item?.pack?.substring(0, 1)?.toUpperCase() + item?.pack?.substring(1),
      bus: item?.route?.bus?.RCNumber,
      phone: item?.appUser?.phone,
      guardian: item?.passenger?.guardian?.name,
      LastTransitionAmount: item?.amount,
      LastTransitionDiscount: item?.discount,
      LastTransitionTotal: item?.amount - item?.discount,
      month: months[item?.date_.month],
      year: item?.date_.year,
      startsFrom: item.startsFrom?.address,
      avgDistance: item.avgDistance,
      avgMorningDuration: item.avgMorningDuration,
      avgEveningDuration: item.avgEveningDuration,
    }
  })

  const column = [
    { title: 'Student Name', field: 'name' },
    { title: 'ID', field: 'id' },
    { title: 'School', field: 'school' },
    { title: 'Phone', field: 'phone' },
    { title: 'Package', field: 'package' },
    { title: 'Duration', field: 'pack' },
    { title: 'Last Transition Amount', field: 'LastTransitionAmount' },
    { title: 'Last Transition Discount', field: 'LastTransitionDiscount' },
    { title: 'Date', field: 'date' },
    { title: 'Month', field: 'month' },
    { title: 'Year', field: 'year' },
  ]

  return (
    <>
      {feeData.loading && <Loading />}
      <MaterialTable
        icons={tableIcons}
        className="mat-table"
        actions={[
          {
            icon: tableIcons.Print,
            tooltip: 'Print',
            onClick: (event, rowData) => alert('Print Invoice For ' + rowData.no),
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
        title="Fees Report"
      />
    </>
  )
}

export default FeeReport
