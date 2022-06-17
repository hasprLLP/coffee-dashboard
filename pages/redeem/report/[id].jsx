/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import GoBack from '@/helpers/goback'
import DropDown from '@/components/dropdown'
import TextField from '@/components/input'
import useFetch from '@/hooks/useFetch'
import Notification from '@/components/notification'
import GeneralCard from '@/components/generalcard'
import GeneralTable from '@/components/generaltable'
import GeneralMoney from '@/components/generalmoney'
import GeneralStats from '@/components/generalstats'
import { Button } from '@chakra-ui/react'
import BasicModal from '@/components/basicModal'
import getMidPoint from '@/utilities/getMidPoint'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GoogleMapReact from 'google-map-react'

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  //& PART 1: Path and Page Data
  const router = useRouter()
  const { id } = router.query //` Doc ID of Bus Owner
  const [busesHere, setBusesHere] = useState([])

  //& PART 2: Panel Sections

  //$ 1: Basic Details
  //@ Data
  const fetchData = useFetch(`owner/${id}`) //` Get Owner Details API
  const data = fetchData?.data //` Response from API

  //@ UI
  function BasicView() {
    return (
      <div className="layout-row-item">
        {/* //$ Bus Owner Title */}
        <div className="layout-sub-title" style={{ color: 'black', width: '40%' }}>
          BUS OWNER INFO
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {/* //$ Bus Owner Info */}
          <div style={{ width: '100%' }}>
            <div style={{ width: '12vw', height: '12vw', marginTop: '1vw', marginBottom: '2vw', resizeMode: 'cover' }}>
              <img
                alt="No Photo Available"
                src={data?.photo?.url || '/static/svg/user.svg'}
                style={{ width: '12vw', height: '12vw', objectFit: 'cover', borderRadius: '100%', backgroundColor: 'lightgray' }}
              />
            </div>
          </div>
          <TextField type={'show'} title={'Bus Owner Name'} placeholder={'No Name'} value={data?.name} />
          <TextField type={'show'} title={'Phone No'} placeholder={'No Phone'} value={data?.phone} />
          <TextField type={'show'} title={'Password'} placeholder={'No Password'} value={data?.password} />
          <TextField type={'show'} title={'Note'} placeholder={'No Note'} value={data?.note} />
        </div>
      </div>
    )
  }

  //$ 2: Control Panel Actions

  function ControlsView() {
    //@ Current Month
    const [month, setMonth] = useState()
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const currentMonth = monthNames[new Date().getMonth()]
    const finalMonthNo = monthNames.indexOf(month || currentMonth) + 1

    //@ Current Year
    const [year, setYear] = useState()
    const yearNames = ['2021', '2022']
    const currentYear = new Date().getFullYear()
    const finalYear = year || currentYear

    //@ Get Stats Bus Owner
    const fetchData = useFetch(`owner/${id}`) //` Get Owner Details API
    const data = fetchData?.data //` Response from API

    //@ Get Stats Bus Owner
    const fetchDataStats = useFetch(`owner/redeem/${id}?month=${finalMonthNo}&year=${finalYear}`) //` Get Owner Details API
    const dataStats = fetchDataStats?.data //` Response from API
    // console.log(dataStats)

    //@ Data
    const ref1 = useRef() //` Modal Ref 1
    const ref2 = useRef() //` Modal Ref 2
    //@ Function 1
    const change1 = async () => {
      try {
        const res = await axios.post(`owner/redeem/${id}`, {
          redeems: dataStats?.routes_stats,
        })
        if (res.data.data) {
          toast.success(`${res.data.data.invoice.amount} has been paid`, {
            position: toast.POSITION.TOP_CENTER,
          })
        }
      } catch (error) {
        toast.error(`There was a Problem : ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
    }
    //@ Function 2
    const change2 = () => {
      try {
        alert('Do Something')
      } catch (error) {
        // console.log(error)
      }
    }

    return (
      <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
        <DropDown title={'Select Month'} options={monthNames} value={month || currentMonth} setter={setMonth} />
        <DropDown title={'Select Year'} options={yearNames} value={year || currentYear} setter={setYear} />
        <div
          style={{
            width: '100%',
            height: '17vw',
            marginTop: '1vw',
            marginRight: '1.5vw',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {/* <GeneralStats type={'green'} title={'Money'} />
          <GeneralStats type={'green'} title={'Money'} />
          <GeneralStats type={'red'} title={'Pending'} /> */}
          {/* {dataStats && ( */}
          <div className="layout-form-row" style={{ position: 'absolute', bottom: '-15%', right: '2%' }}>
            <Button onClick={() => ref1.current.showAlert()} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Submitting">
              REDEEM
            </Button>
            <Notification type={''} />
            <BasicModal
              Head="Are you sure you want to continue ?"
              Message={`About to pay ${dataStats?.redeemableAmountOnCollectedFeeWithPaidPassengers} to ${data?.owner?.name}`}
              ref={ref1}
              fun={change1}
              type="warning"
            />
          </div>
          {/* )} */}
          <div className="layout-form-row" style={{ position: 'absolute', bottom: '-15%', right: '18%' }}>
            <Button onClick={() => ref1.current.showAlert()} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Submitting">
              PRINT
            </Button>
            <Notification type={''} />
            <BasicModal
              Head="Are you sure you want to continue ?"
              Message={`About to pay ${dataStats?.redeemableAmountOnCollectedFeeWithPaidPassengers} to ${data?.owner?.name}`}
              ref={ref1}
              fun={change1}
              type="warning"
            />
          </div>
        </div>
      </div>
    )
  }

  //$ 3: List of Buses
  //@ Data
  const dataBus = fetchData?.data?.buses //` Response from API
  // console.log(dataBus)

  const buses = [
    { id: '0123', name: 'Red Bus 1', passengers: '58 Passengers', redeem: 'Redeem : ₹500' },
    { id: '0123', name: 'Red Bus 2', passengers: '59 Passengers', redeem: 'Redeem : ₹600' },
    { id: '0123', name: 'Red Bus 3', passengers: '60 Passengers', redeem: 'Redeem : ₹700' },
    { id: '0123', name: 'Red Bus 4', passengers: '51 Passengers', redeem: 'Redeem : ₹800' },
    { id: '0123', name: 'Red Bus 5', passengers: '52 Passengers', redeem: 'Redeem : ₹900' },
    { id: '0123', name: 'Red Bus 6', passengers: '53 Passengers', redeem: 'Redeem : ₹250' },
    { id: '0123', name: 'Red Bus 7', passengers: '54 Passengers', redeem: 'Redeem : ₹100' },
  ]
  //@ UI
  function BusesView() {
    return (
      <>
        <div style={{ width: '100%' }}>
          <div className="layout-sub-title" style={{ color: 'black', width: '40%', marginBottom: '1vw' }}>
            Buses under {data?.name}
          </div>
        </div>
        {/* //@ Buses Mapped */}
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {busesHere?.map((bus, i) => {
            return <GeneralCard key={i} id={bus.id} page={'bus'} first={bus?.RCNumber} second={bus?.name} third={`Commission ₹ ${bus?.commission}`} />
          })}
        </div>
      </>
    )
  }

  //$ 4: Fee Statistics
  //@ Data
  const [month, setMonth] = useState()
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const currentMonth = monthNames[new Date().getMonth()]
  //@ UI
  function FeesView() {
    return (
      <>
        {/* //@ Choose Month */}
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <DropDown title={false} options={monthNames} value={month || currentMonth} setter={setMonth} />
          <div className="button">
            <Button onClick={() => alert('Change Month')} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Submitting">
              Change
            </Button>
            <Notification type={''} />
          </div>
        </div>
        {/* //@ Show Money Cards */}
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <GeneralMoney type={'green'} title={'Redeemed'} />
          <GeneralMoney type={'green'} title={'Cashback'} />
          <GeneralMoney type={'blue'} title={'Unverified'} />
          <GeneralMoney type={'red'} title={'Pending'} />
        </div>
      </>
    )
  }

  //$ 5: List of Students
  //@ Data
  const kids = [
    { id: '0123', name: 'Student 1', phone: '9874563254', money: 'Money : ₹500' },
    { id: '0123', name: 'Student 2', phone: '9874563254', money: 'Money : ₹600' },
    { id: '0123', name: 'Student 3', phone: '9874563254', money: 'Money : ₹700' },
    { id: '0123', name: 'Student 4', phone: '9874563254', money: 'Money : ₹800' },
    { id: '0123', name: 'Student 5', phone: '9874563254', money: 'Money : ₹900' },
    { id: '0123', name: 'Student 6', phone: '9874563254', money: 'Money : ₹250' },
    { id: '0123', name: 'Student 7', phone: '9874563254', money: 'Money : ₹100' },
  ]
  //@ UI
  function StudentsView() {
    return (
      <>
        <div style={{ width: '100%' }}>
          <div className="layout-sub-title" style={{ color: 'black', width: '40%', marginTop: '1vw', marginBottom: '1vw' }}>
            Students under {data?.name}
          </div>
        </div>
        {/* //@ Show Kids Mapped */}
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {kids.map((kid, i) => {
            return <GeneralCard key={i} id={kid.id} page={'passenger'} first={kid.name} second={kid.phone} third={kid.money} />
          })}
        </div>
      </>
    )
  }

  //$ 6: View Documents
  //@ Data
  const documents = [
    {
      id: '0123',
      name: 'Aadhar Card Front',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
    },
    {
      id: '0123',
      name: 'Aadhar Card Back',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
    },
    {
      id: '0123',
      name: 'PAN Card',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
    },
    {
      id: '0123',
      name: 'Driving License',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
    },
    {
      id: '0123',
      name: 'PUC',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
    },
  ]
  //@ UI
  function DocumentsView() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {documents.map((doc, i) => {
          return (
            <div
              key={i}
              onClick={() => window.open(doc.url)}
              style={{
                fontSize: '1vw',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: 'teal',
                textDecoration: 'underline',
                padding: '1vw',
                marginLeft: '-1vw',
              }}
            >
              {doc.name}
            </div>
          )
        })}
      </div>
    )
  }

  //$ 7: Previous Transactions
  //@ Data
  const fetchDataTrans = useFetch(`owner/get_redeem_receipt/${id}`) //` Get Owner Details API
  const dataTrans = fetchDataTrans?.data //` Response from API

  const transactionData = dataTrans?.map((data, i) => {
    return { amount: data.invoice.amount, invoice: i, date: data.date_.formattedDate }
  })

  //@ Columns
  const tableColumn = [
    { title: 'Amount', field: 'amount' },
    { title: 'Invoice No', field: 'invoice' },
    { title: 'Date', field: 'date' },
  ]

  //$ 8: View Route
  //@ Route Data
  const route = [
    { lat: 23.846, lng: 78.801 },
    { lat: 23.856, lng: 78.811 },
    { lat: 23.866, lng: 78.821 },
    { lat: 23.876, lng: 78.831 },
    { lat: 23.896, lng: 78.841 },
  ]

  //@ Student Boarding Points
  const students = [
    { name: 'Pradhyum Upadhyay', lat: 23.896, lng: 78.841 },
    { name: 'Sanjay Kumar', lat: 23.866, lng: 78.821 },
    { name: 'Harsh Dangi', lat: 23.876, lng: 78.831 },
    { name: 'Sanjay Kumar', lat: 23.856, lng: 78.811 },
    { name: 'Abhay Rohit', lat: 23.846, lng: 78.801 },
  ]

  //@ Function To Draw Path
  const drawPath = google => {
    var flightPath = new google.maps.Polyline({
      path: route,
      geodesic: true,
      strokeColor: '#38b2ac',
      strokeOpacity: 0.3,
      strokeWeight: 7,
    })

    flightPath.setMap(google.map)
  }

  //@ Get Middle Point of All Students
  const { midLat, midLng } = getMidPoint(students)

  //@ UI
  function RouteView() {
    return (
      <div
        className="layout-form"
        style={{ height: '75%', width: '95%', borderRadius: 'var(--chakra-radii-lg)', overflow: 'hidden', marginBottom: '2vw' }}
      >
        {/* //@ Map */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.MAP_KEY, libraries: ['places', 'geometry', 'drawing', 'visualization'] }}
          defaultCenter={{
            lat: midLat || 0,
            lng: midLng || 0,
          }}
          defaultZoom={13}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={drawPath}
        >
          {/* //@ Students on Map */}
          {students.map((student, i) => {
            return (
              <div key={i} lat={student.lat} lng={student.lng} text="My Marker">
                <img
                  alt="tracking"
                  style={{ width: '2.5vw', height: '100%', objectFit: 'contain', transform: 'translate(-50%,-90%)' }}
                  src={'/static/svg/tracking.svg'}
                />
              </div>
            )
          })}
        </GoogleMapReact>
      </div>
    )
  }

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Details
        </div>
        {/* //& 1: Owner Info Left Row */}
        <div className="layout-row" style={{ alignItems: 'flex-start' }}>
          <BasicView />
          {/* //& 2: Notifications Right Row */}
          <div className="layout-row-item">
            <div className="layout-sub-title" style={{ color: 'black' }}>
              CONTROL PANEL
            </div>
            {/* //$ Bus Owner Verified  */}
            <ControlsView />
          </div>
        </div>
        {/* //& 3:  Bus Owner Buses */}
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {/* <BusesView /> */}
          {/* //& 7: Bus Owner Transactions */}
          <div style={{ width: '100%' }}>
            <div className="layout-sub-title" style={{ color: 'black', width: '40%', marginTop: '2vw' }}>
              Previous Transactions
            </div>
            <GeneralTable title="Transactions" data={transactionData} column={tableColumn} />
          </div>
        </div>
        <br />
      </div>
    </div>
  )
}
