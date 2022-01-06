/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import { forwardRef } from 'react'
import tableIcons from '@/utilities/tableIcons'
import axios from 'axios'

axios.defaults.withCredentials = true

export default function PassengerTable() {
  //$ Online Data
  const onlineData = [
    {
      name: 'Abhay Rohit',
      studentID: 'DMA0001',
      isVerified: false,
      status: 'active',
      DOB: '02-05-1998',
      user: { name: 'Abhays Father', phone: '9658745632' },
      location: { address: 'MIG 67, Gau Nagar, Makronia' },
      cls: 'Class 12th',
      section: 'B',
    },
  ]

  //$ Mapped Data
  const data = onlineData.map(item => {
    return {
      name: item.name,
      id: item.studentID,
      isVerified: item.isVerified ? 'Verified' : 'Not Verified',
      status: item.status,
      DOB: item.DOB.substring(0, 10),
      guardianName: item.user.name,
      guardianPhone: item.user.phone,
      address: item.location.address,
      cls: item.cls,
      section: item.section,
    }
  })

  //$ Column
  const column = [
    { title: 'Student ID', field: 'id' },
    { title: 'Student Name', field: 'name' },
    { title: 'Verified', field: 'isVerified' },
    { title: 'DOB', field: 'DOB' },
    { title: 'Parent Name', field: 'guardianName' },
    { title: 'Parent Phone', field: 'guardianPhone' },
    { title: 'Address', field: 'address' },
    { title: 'Class', field: 'cls' },
    { title: 'Section', field: 'section' },
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
