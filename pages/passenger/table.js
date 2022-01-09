/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import tableIcons from '@/utilities/tableIcons'
import Loading from '@/blocks/loading'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data.data)

export default function PassengerTable() {

  const { data, error } = useSWR(`passenger?populate=${JSON.stringify({ path: 'route feePackage school user' })}`, fetcher)

  //$ Mapped Data
  const dataShow = data?.map(item => {
    return {
      name: item.name,
      id: item.passengerID,
      gender: item.gender,
      school: item.school?.name,
      route: item.route?.name,
      feePackage: item.feePackage?.name,
      pack: item.pack,
      isVerified: item.isVerified ? "Verified" : "Not Verified",
      status: item.status,
      DOB: item.DOB?.substring(0, 10),
      guardianName: item.user?.name,
      guardianPhone: item.user?.phone,
      address: item.location?.address,
      cls: item.cls,
      section: item.section,
      payDate: item.payDate?.substring(0, 10),
      isStudent: item.isStudent ? "Student" : "Teacher",
      joiningDate: item.joiningDate?.substring(0, 10),
      distanceTravelled: item.distanceTravelled
    }
  })

  //$ Column
  const column = [
    { title: 'Student', field: 'name' },
    { title: 'Student ID', field: 'id' },
    { title: 'Gender', field: 'gender' },
    { title: 'School', field: 'school' },
    { title: 'Route', field: 'route' },
    { title: 'Package', field: 'feePackage' },
    { title: 'Duration', field: 'pack' },
    { title: 'Verified', field: 'isVerified' },
    { title: 'Status', field: 'status' },
    { title: 'DOB', field: 'DOB' },
    { title: 'Parent', field: 'guardianName' },
    { title: 'Phone', field: 'guardianPhone' },
    { title: 'Address', field: 'address' },
    { title: 'Class', field: 'cls' },
    { title: 'Section', field: 'section' },
    { title: 'Pay Date', field: 'payDate' },
    { title: 'Type', field: 'isStudent' },
    { title: 'Joining', field: 'joiningDate' },
    { title: 'Distance Travelled', field: 'distanceTravelled' },
  ]


  if (error) return <div className="home"><div>failed to load</div></div>
  if (!data) return  <Loading />

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
            title="Students Report Table View"
          />
        </div>
      </div>
    </div>
  )
}
