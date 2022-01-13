/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import GoBack from '@/helpers/goback'
import DropDown from '@/components/dropdown'
import TextField from '@/components/input'
import useFetch from '@/hooks/useFetch'
import Notification from '@/components/notification'
import GeneralCard from '@/components/generalcard'
import GeneralTable from '@/components/generaltable'
import GeneralMoney from '@/components/generalmoney'
import { Button } from '@chakra-ui/react'
import BasicModal from '@/components/basicModal'
import getMidPoint from '@/utilities/getMidPoint'
import GoogleMapReact from 'google-map-react'

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
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

  //$ Function To Draw Path
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

  //$ Get Middle Point of All Students

  const { midLat, midLng } = getMidPoint(students)

  //$ Path and Page Data
  const router = useRouter()
  const { id } = router.query

  //$ Month for Reports
  const [month, setMonth] = useState()
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const currentMonth = monthNames[new Date().getMonth()]

  //$ Control Functions
  const ref1 = useRef()
  const ref2 = useRef()

  const change1 = () => {
    try {
      alert('Do Something')
    } catch (error) {
      console.log(error)
    }
  }

  const change2 = () => {
    try {
      alert('Do Something')
    } catch (error) {
      console.log(error)
    }
  }

  //$ Fetch Data with ID
  const fetchData = useFetch(`owner/${id}`)
  const data = fetchData?.data?.owner

  console.log(data);
  

  //$ Table Info
  //@ Data
  const tableData = [
    { id: 0, name: 'Transaction', phone: 9874654123, date: '02-01-2022' },
    { id: 0, name: 'Transaction', phone: 9874654123, date: '02-01-2022' },
    { id: 0, name: 'Transaction', phone: 9874654123, date: '02-01-2022' },
  ]
  //@ Columns
  const tableColumn = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Phone', field: 'phone' },
    { title: 'Date', field: 'date' },
  ]

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Details
        </div>
        {/* //& Owner Info Left Row */}
        <div className="layout-row" style={{ alignItems: 'flex-start' }}>
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
          {/* //& Notifications Right Row */}
          <div className="layout-row-item">
            <div className="layout-sub-title" style={{ color: 'black' }}>
              CONTROL PANEL
            </div>
            {/* //$ Bus Owner Verified  */}
            <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
              <DropDown title={'Control 1'} options={[]} value={''} setter={null} />
              <div className="button">
                <Button onClick={() => ref1.current.showAlert()} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Submitting">
                  Modify
                </Button>
                <Notification type={''} />
              </div>
              <BasicModal Head="Warning 1!⚠️" Message="Message 1." ref={ref1} fun={change1} type="warning" />
              <DropDown title={'Control 2'} options={[]} value={''} setter={null} />
              <div className="button">
                <Button onClick={() => ref2.current.showAlert()} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Submitting">
                  Modify
                </Button>
                <Notification type={''} />
              </div>
              <BasicModal Head="Warning 2 ! ⚠️" Message="Message 2." ref={ref2} fun={change2} type="warning" />
            </div>
          </div>
        </div>

        {/* //$ Bus Owner Buses */}
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <div style={{ width: '100%' }}>
            <div className="layout-sub-title" style={{ color: 'black', width: '40%', marginBottom: '1vw' }}>
              Buses under {data?.name}
            </div>
          </div>
          <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
            {[...new Array(5)].map((bus, i) => {
              return <GeneralCard key={i} />
            })}
          </div>
          {/* //$ Fee Statistics */}
          <div style={{ width: '100%', marginTop: '2vw' }}>
            <div className="layout-sub-title" style={{ color: 'black', width: '40%' }}>
              Fee Statistics
            </div>
          </div>
          {/* //$ Choose Month  */}
          <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
            <DropDown title={false} options={monthNames} value={month || currentMonth} setter={setMonth} />
            <div className="button">
              <Button onClick={() => alert('Change Month')} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Submitting">
                Change
              </Button>
              <Notification type={''} />
            </div>
          </div>
          <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
            <GeneralMoney type={'green'} title={'Redeemed'} />
            <GeneralMoney type={'green'} title={'Cashback'} />
            <GeneralMoney type={'blue'} title={'Unverified'} />
            <GeneralMoney type={'red'} title={'Pending'} />
          </div>
          <div style={{ width: '100%' }}>
            <div className="layout-sub-title" style={{ color: 'black', width: '40%', marginBottom: '1vw' }}>
              Students under {data?.name}
            </div>
          </div>
          <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
            {[...new Array(5)].map((bus, i) => {
              return <GeneralCard key={i} />
            })}
          </div>
          {/* //$ Bus Owner Transactions */}
          <div style={{ width: '100%' }}>
            <div className="layout-sub-title" style={{ color: 'black', width: '40%', marginTop: '2vw' }}>
              Previous Transactions
            </div>
            <GeneralTable title="Transactions" data={tableData} column={tableColumn} />
          </div>
        </div>
        {/* //$ Fee Statistics */}
        <div style={{ width: '100%', marginTop: '2vw' }}>
          <div className="layout-sub-title" style={{ color: 'black', width: '100%', marginBottom: '1vw' }}>
            Route On Map
          </div>
        </div>
        <div
          className="layout-form"
          style={{ height: '75%', width: '95%', borderRadius: 'var(--chakra-radii-lg)', overflow: 'hidden', marginBottom: '2vw' }}
        >
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

        <br />
      </div>
    </div>
  )
}
