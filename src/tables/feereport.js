/* eslint-disable react/display-name */
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import tableIcons from "@/utilities/tableIcons"
import axios from 'axios'

const FeeReport = () => {

  const [onlineData, setData] = useState([])
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  //@ Fetch Bus API Function
  const getData = async () => {
    try {
      const populate = {
        path: 'route passenger appUser ',
        populate: { path: "feePackage bus school lastTransaction" }
      }
      const response = await axios.get(`transaction?populate=${JSON.stringify(populate)}`)
      setData(response.data.data)
      console.log(response.data.data)
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
      date: item?.date?.substring(0, 10),
      name: item?.passenger.name,
      id: item?.passenger.passengerID,
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
    { title: "Student Name", field: "name" },
    { title: "ID", field: "id" },
    { title: "School", field: "school" },
    { title: "Phone", field: "phone" },
    { title: "Package", field: "package" },
    { title: "Duration", field: "pack" },
    { title: "Last Transition Amount", field: "LastTransitionAmount" },
    { title: "Last Transition Discount", field: "LastTransitionDiscount" },
    { title: "Date", field: "date" },
    { title: "Month", field: "month" },
    { title: "Year", field: "year" },
  ];

  return (
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
      title="Fees Report"
    />
  )
};

export default FeeReport;
