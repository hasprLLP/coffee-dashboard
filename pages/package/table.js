/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import { useState,useEffect } from "react";
import tableIcons from "@/utilities/tableIcons"
import axios from "axios";

axios.defaults.withCredentials = true;

export default function PackageTable() {

  //$ Online Data
  const [onlineData, setData] = useState([])

  //@ Fetch Bus API Function
  const getData = async () => {
    try {
      const response = await axios.get("package/")
      setData(response.data.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

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
            data={onlineData}
            title="Package Report Table View"
          />
        </div>
      </div>
    </div>
  )
}
