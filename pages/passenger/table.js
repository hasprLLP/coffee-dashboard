/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import { useEffect, useState } from 'react'
import tableIcons from '@/utilities/tableIcons'
import axios from 'axios'

axios.defaults.withCredentials = true

export default function PassengerTable() {

  const [onlineData, setData] = useState([])

  //@ Fetch Routes API Function
  const getData = async () => {
    try {
      const response = await axios.get("passenger/")
      setData(response.data.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  //$ Mapped Data
  const data = onlineData.map(item => {
    return {
      name: item.name,
      id: item.passengerID,
      gender: item.gender,
      school: item.school?.name,
      route: item.route?.name,
      feePackage: item.feePackage?.name,
      isVerified: item.isVerified ? "Verified" : "Not Verified",
      status: item.status,
      DOB: item.DOB?.substring(0, 10),
      guardianName: item.user?.name,
      guardianPhone: item.user?.phone,
      address: item.location?.address,
      cls: item.cls,
      section: item.section,
      dueDate: item.dueDate?.substring(0, 10),
      feeDate: item.feeDate?.substring(0, 10),
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
    { title: 'Verified', field: 'isVerified' },
    { title: 'Status', field: 'status' },
    { title: 'DOB', field: 'DOB' },
    { title: 'Parent', field: 'guardianName' },
    { title: 'Phone', field: 'guardianPhone' },
    { title: 'Address', field: 'address' },
    { title: 'Class', field: 'cls' },
    { title: 'Section', field: 'section' },
    { title: 'Due Date', field: 'dueDate' },
    { title: 'Fee Date', field: 'feeDate' },
    { title: 'Type', field: 'isStudent' },
    { title: 'Joining', field: 'joiningDate' },
    { title: 'Distance Travelled', field: 'distanceTravelled' },
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
            title="Students Report Table View"
          />
        </div>
      </div>
    </div>
  )
}
